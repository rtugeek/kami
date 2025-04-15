// src/entities/card-code.entity.ts
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class CardCode extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  code: string

  @Column({ nullable: true })
  createdBy?: string

  @CreateDateColumn({ type: 'datetime' })
  createTime?: Date

  @UpdateDateColumn({ type: 'datetime' })
  updateTime?: Date

  /**
   * 备注
   */
  @Column({ nullable: true })
  note?: string

  /**
   * 剩余验证次数
   */
  @Column({ default: 1 })
  remainValidateCount: number

  /**
   * 产品ID
   */
  @Column({ nullable: false })
  productId: number

  @Column({ nullable: true })
  expireTime?: Date
}
