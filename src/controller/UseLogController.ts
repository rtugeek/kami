import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { R } from '@widget-js/web-api'
import { UseLog } from '../db/UseLog'
import { UseLogService } from '../service/UseLogService'

@Controller('use-log')
export class UseLogController {
  constructor(private readonly useLogService: UseLogService) {}

  @Post()
  async create(@Body() log: Partial<UseLog>) {
    const data = await this.useLogService.createLog(log)
    return R.ok(data)
  }

  @Get('count')
  async getCount(@Query('code') code: string, @Query('productId') productId?: number) {
    const count = await this.useLogService.getCountByCode(code, productId)
    return R.ok({ count })
  }
}
