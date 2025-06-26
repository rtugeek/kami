import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UseLog } from '../db/UseLog'
import { ProductService } from './ProductService'

@Injectable()
export class UseLogService {
  constructor(
    @InjectRepository(UseLog)
    private readonly repository: Repository<UseLog>,
    private readonly productService: ProductService,
  ) {}

  async createLog(log: UseLog): Promise<UseLog> {
    log.createTime = new Date()
    // let count = 0
    // const product = await this.productService.getProductById(log.productId)
    // if (log.code) {
    //   count = await this.getCountByCode(log.code, log.productId)
    // }
    // else {
    //   count = await this.getCountByDeviceId(log.deviceId, log.productId)
    //   if (count >= product!.meta.count) {
    //
    //   }
    // }
    return this.repository.save(log)
  }

  async getCountByDeviceId(deviceId: string, productId: number): Promise<number> {
    return this.repository.count({
      where: {
        deviceId,
        productId,
      },
    })
  }

  async getCountByCode(code: string, productId?: number): Promise<number> {
    let pId = productId
    if (!productId) {
      const product = await this.productService.getProductByCode(code)
      pId = product?.id
    }
    if (pId) {
      return this.repository.count({ where: { code, productId: pId } })
    }
    else {
      return this.repository.count({ where: { code } })
    }
  }
}
