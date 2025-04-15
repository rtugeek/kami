// src/modules/card-code.module.ts
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CardCodeController } from './controller/CardCodeController'
import { CardCode } from './db/CardCode'
import { Product } from './db/Product'
import { ValidateLog } from './db/ValidateLog'
import { CardCodeService } from './service/CardCodeService'
import { ProductService } from './service/ProductService'
import { ValidateLogService } from './service/ValidateLogService'

@Module({
  imports: [TypeOrmModule.forFeature([ValidateLog, CardCode, Product])],
  providers: [ValidateLogService, CardCodeService, ProductService],
  controllers: [CardCodeController],
})
export class CardCodeModule {}
