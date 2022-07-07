
import LoggerWinston from '../../../../../../src/ports/logger/winston'
import { Request, Response } from '../../../../../ports/http/interfaces'
import RouteHttpGetOneUse from './getOne'

describe('Adapter User', () => {
    let logger: LoggerWinston = new LoggerWinston()
    let routeHttpGetOneUse: RouteHttpGetOneUse = new RouteHttpGetOneUse(logger)
    const mockRequest = { body: {}, headers: { 'Content-Type': 'application/json' } } as unknown as Request;
    const mockResponse: Response =  ({
        status: (_) => {
            return {
                json: () => {}
            }
        }
    }) as Response

    test('should handler getOneUser', () => {
        jest.spyOn(logger, 'info').mockImplementation(() => null)
        const response = routeHttpGetOneUse.handler(mockRequest, mockResponse)
        expect(response).not.toBeNull()
    })
})