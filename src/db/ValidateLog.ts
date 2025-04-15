import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('validate_log') // 指定数据库表名
export class ValidateLog {
  @PrimaryGeneratedColumn()
  id!: number // 自增主键

  @Column({ nullable: true })
  deviceId?: string // 设备 ID

  @CreateDateColumn()
  createTime!: Date // 创建时间

  @Column({ nullable: true })
  ip?: string // IP 地址

  @Column({ nullable: true })
  code?: string // 卡密

  /**
   * 剩余激活次数
   */
  @Column({ default: 0 })
  remainCount!: number

  /**
   * 0:未激活 1:成功 , 2:已被使用 3:已过期 404:卡密不存在
   */
  @Column({ default: 0 })
  validateResult!: number
}
