import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ValidateLog } from '../db/ValidateLog'

@Injectable()
export class ValidateLogService {
  constructor(
    @InjectRepository(ValidateLog)
    private readonly repository: Repository<ValidateLog>,
  ) {}

  async createLog(log: ValidateLog): Promise<ValidateLog> {
    log.createTime = new Date()
    return this.repository.save(log)
  }

  async findLatestSuccessLog(code: string): Promise<ValidateLog | null> {
    return this.repository.findOne({
      where: { code, validateResult: 1 },
      order: { createTime: 'DESC' },
    })
  }

  async findFirstSuccessLog(code: string): Promise<ValidateLog | null> {
    return this.repository.findOne({
      where: { code, validateResult: 1 },
      order: { createTime: 'ASC' },
    })
  }
}
