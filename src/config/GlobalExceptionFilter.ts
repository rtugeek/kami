import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'

import { R } from '@widget-js/web-api'
import { Response } from 'express'

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()

    response.status(status).json(R.fail({ msg: exception.message, code: status }))
  }
}
