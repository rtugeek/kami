import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as dayjs from 'dayjs'
import { Repository } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { AppException } from '../config/AppException'
import { CardCode } from '../db/CardCode'
import { ValidateLog } from '../db/ValidateLog'
import { ProductService } from './ProductService'
import { ValidateLogService } from './ValidateLogService'

@Injectable()
export class CardCodeService {
  constructor(
    @InjectRepository(CardCode)
    private readonly cardCodeRepository: Repository<CardCode>,
    private readonly productService: ProductService,
    private readonly validateLogService: ValidateLogService,
  ) {}

  // 生成卡密
  async generateCodes(
    count: number,
    productId: number,
    createBy?: string,
    note?: string,
  ): Promise<CardCode[]> {
    const codes: CardCode[] = []
    for (let i = 0; i < count; i++) {
      const card = new CardCode()
      card.code = uuidv4()
      card.productId = productId
      card.note = note
      card.createdBy = createBy ?? 'admin'
      card.createTime = new Date()
      card.updateTime = new Date()
      card.remainValidateCount = 1
      codes.push(await this.cardCodeRepository.save(card))
    }
    return codes
  }

  // 验证卡密
  async validateCode(code: string, deviceId: string, ip?: string): Promise<CardCode> {
    const card = await this.cardCodeRepository.findOne({ where: { code } })
    const log = new ValidateLog()
    log.code = code
    log.deviceId = deviceId
    log.ip = ip
    if (card) {
      const latestSuccessLog = await this.validateLogService.findLatestSuccessLog(code)
      let remainCount = card.remainValidateCount
      // 检测卡密是否已被使用完
      if (latestSuccessLog && latestSuccessLog.deviceId !== deviceId) {
        remainCount = remainCount - 1
        if (card.remainValidateCount <= 0) {
          throw new AppException('卡密已被使用')
        }
        await this.cardCodeRepository.update({ code }, { remainValidateCount: remainCount })
      }
      // 检测商品是否过期
      const product = await this.productService.getProductById(card.productId)
      if (product == null) {
        throw new AppException('商品不存在')
      }
      const now = dayjs()
      if (!card.expireTime) {
        // 首次激活
        const expireTime: Date = now.add(product.timeLength, 'second').toDate()
        card.expireTime = expireTime
        remainCount = remainCount - 1
        await this.cardCodeRepository.update({ code }, { remainValidateCount: remainCount, expireTime })
      }
      else {
        if (card.expireTime.getTime() < now.valueOf()) {
          throw new AppException('卡密已过期')
        }
      }
      log.createTime = new Date()
      log.remainCount = remainCount < 0 ? 0 : remainCount
      log.validateResult = 1
      await this.validateLogService.createLog(log) // 记录成功日志
      return card
    }
    else {
      throw new AppException('卡密不存在')
    }
  }

  // 获取所有卡密
  async getAllCodes(): Promise<CardCode[]> {
    return this.cardCodeRepository.find()
  }
}
