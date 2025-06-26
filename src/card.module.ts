// src/modules/card-code.module.ts
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CardCodeController } from './controller/CardCodeController'
import { ProductController } from './controller/ProductController'
import { UseLogController } from './controller/UseLogController'
import { CardCode } from './db/CardCode'
import { Product } from './db/Product'
import { UseLog } from './db/UseLog'
import { ValidateLog } from './db/ValidateLog'
import { CardCodeService } from './service/CardCodeService'
import { ProductService } from './service/ProductService'
import { UseLogService } from './service/UseLogService'
import { ValidateLogService } from './service/ValidateLogService'

@Module({
  imports: [TypeOrmModule.forFeature([ValidateLog, CardCode, Product, UseLog])],
  providers: [ValidateLogService, CardCodeService, ProductService, UseLogService],
  controllers: [CardCodeController, ProductController, UseLogController],
})
export class CardCodeModule {}
