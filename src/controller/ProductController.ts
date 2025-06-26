import { Controller, Get, Param } from '@nestjs/common'
import { R } from '@widget-js/web-api'
import { ProductService } from '../service/ProductService'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    const product = await this.productService.getProductById(Number(id))
    return R.ok(product)
  }

  @Get('code/:code')
  async getProductByCode(@Param('code') code: string) {
    const productByCode = await this.productService.getProductByCode(code)
    return R.ok(productByCode)
  }
}
