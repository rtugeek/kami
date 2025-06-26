import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('use_log')
export class UseLog {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 36, nullable: true })
  code: string

  @Column({ length: 64, nullable: true })
  deviceId: string

  @Column({ type: 'datetime', nullable: true })
  createTime: Date

  @Column({ type: 'int', default: 1 })
  count: number

  @Column({ type: 'int', nullable: true })
  productId: number
}
