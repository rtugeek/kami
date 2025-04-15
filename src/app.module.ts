import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppService } from './app.service'
import { CardCodeModule } from './card.module'
import { databaseConfig } from './config/database.config'

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), CardCodeModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
