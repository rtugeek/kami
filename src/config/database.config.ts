import type { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { CardCode } from '../db/CardCode'
import { Product } from '../db/Product'
import { ValidateLog } from '../db/ValidateLog'

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'rm-wz926c78mfwp7k13spo.mysql.rds.aliyuncs.com',
  port: 3306,
  username: 'ka_mi',
  password: 'jooMuwe5phichai4ou4kai0eshaeti8M',
  database: 'ka_mi',
  entities: [CardCode, Product, ValidateLog],
  synchronize: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
}
