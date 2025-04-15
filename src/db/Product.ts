import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 32, nullable: true })
  name: string

  @Column({ type: 'bigint', nullable: true, comment: '商品使用时长 单位秒' })
  timeLength: number

  @Column({ type: 'varchar', length: 255, nullable: true, comment: '描述' })
  desc: string
}
