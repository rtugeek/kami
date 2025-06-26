import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CardCode } from '../db/CardCode'
import { Product } from '../db/Product'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(CardCode)
    private readonly cardCodeRepository: Repository<CardCode>,
  ) {}

  async getProductById(id: number): Promise<Product | null> {
    return this.productRepository.findOne({ where: { id } })
  }

  async getProductByCode(code: string): Promise<Product | null> {
    const card = await this.cardCodeRepository.findOne({ where: { code } })
    if (!card)
      return null
    return this.productRepository.findOne({ where: { id: card.productId } })
  }
}
