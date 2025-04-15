import { Test, TestingModule } from '@nestjs/testing'
import { R } from '@widget-js/web-api'
import { CardCodeService } from '../../service/CardCodeService'
import { CardCodeController } from '../CardCodeController'

describe('cardCodeController', () => {
  let cardCodeController: CardCodeController
  let cardCodeService: Partial<CardCodeService>

  beforeEach(async () => {
    cardCodeService = {
      generateCodes: jest.fn(),
      validateCode: jest.fn(),
      getAllCodes: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardCodeController],
      providers: [
        {
          provide: CardCodeService,
          useValue: cardCodeService,
        },
      ],
    }).compile()

    cardCodeController = module.get<CardCodeController>(CardCodeController)
  })

  it('should generate codes when key is valid', async () => {
    const mockResult = ['code1', 'code2'];
    (cardCodeService.generateCodes as jest.Mock).mockResolvedValue(mockResult)

    const result = await cardCodeController.generateCodes(2, 1, 'admin', 'wohDeiqueo4bohseeg2ooTieV6nuhia1')
    expect(result).toEqual(mockResult)
    expect(cardCodeService.generateCodes).toHaveBeenCalledWith(2, 1, undefined, 'admin')
  })

  it('should return false when key is invalid', async () => {
    const result = await cardCodeController.generateCodes(2, 1, 'admin', 'invalidKey')
    expect(result).toBe(false)
    expect(cardCodeService.generateCodes).not.toHaveBeenCalled()
  })

  it('should validate code and return result', async () => {
    const mockResult = true;
    (cardCodeService.validateCode as jest.Mock).mockResolvedValue(mockResult)

    const req = { ip: '127.0.0.1' } as any
    const result = await cardCodeController.validateCode('testCode', 'device123', 'user123', req)
    expect(result).toEqual(R.ok(mockResult))
    expect(cardCodeService.validateCode).toHaveBeenCalledWith('testCode', 'device123', '127.0.0.1')
  })

  it('should get all codes', async () => {
    const mockResult = ['code1', 'code2'];
    (cardCodeService.getAllCodes as jest.Mock).mockResolvedValue(mockResult)

    const result = await cardCodeController.getAllCodes()
    expect(result).toEqual(mockResult)
    expect(cardCodeService.getAllCodes).toHaveBeenCalled()
  })
})
