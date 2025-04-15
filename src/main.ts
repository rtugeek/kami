import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { GlobalExceptionFilter } from './config/GlobalExceptionFilter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'https://widgetjs.cn',
        'http://itime.fun',
        'http://localhost:1646',
        'http://127.0.0.1:1646',
      ],
      methods: 'GET,HEAD,PUT,PATCH,OPTIONS,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
      allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    },
  })
  app.setGlobalPrefix('/kami/api/')

  app.useGlobalFilters(new GlobalExceptionFilter())
  await app.listen(process.env.PORT ?? 1647)
}
bootstrap()
