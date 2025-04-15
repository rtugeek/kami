import { HttpException } from '@nestjs/common'

export class AppException extends HttpException {
  code: number
  msg: string

  constructor(msg) {
    super(msg, 500)
    this.msg = msg
    this.code = 500
  }
}
