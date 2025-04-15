// src/controllers/card-code.controller.ts
import { Controller, Get, Query } from '@nestjs/common'
import { IResponse, R } from '@widget-js/web-api'
import { CardCode } from '../db/CardCode'
// 导入 Request 类型
import { CardCodeService } from '../service/CardCodeService'

@Controller('/')
export class CardCodeController {
  constructor(private readonly cardCodeService: CardCodeService) {}
  @Get()
  getHello(): string {
    return 'Hello World!'
  }

  @Get('generate')
  async generateCodes(
    @Query('count') count: number,
    @Query('productId') productId: number,
    @Query('createBy') createBy?: string,
    @Query('key') key?: string,
  ) {
    if (key === 'wohDeiqueo4bohseeg2ooTieV6nuhia1') {
      const data = await this.cardCodeService.generateCodes(count, productId, undefined, createBy)
      return R.ok(data)
    }
    else {
      return R.ok(false)
    }
  }

  @Get('validate')
  async validateCode(
    @Query('code') code: string,
    @Query('deviceId') deviceId: string,
  ): Promise<IResponse<CardCode>> {
    const isValid = await this.cardCodeService.validateCode(code, deviceId, '')
    return R.ok(isValid)
  }

  @Get()
  async getAllCodes() {
    return this.cardCodeService.getAllCodes()
  }
}
