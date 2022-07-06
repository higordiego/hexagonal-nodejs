
import LoggerWinston from '../../../../../../src/ports/logger/winston'
import { Request, Response } from '../../../../../ports/http/interfaces'
import RouteHttpGetOneUse from './getOne'

describe('Adapter User', () => {
    let routeHttpGetOneUse: RouteHttpGetOneUse = new RouteHttpGetOneUse()
    const mockRequest = { body: {}, headers: { 'Content-Type': 'application/json' } } as unknown as Request;
    const mockResponse: Response =  ({
        status: (_) => {
            return {
                json: () => {}
            }
        }
    }) as Response

    test('should handler getOneUser', () => {
        const response = routeHttpGetOneUse.handler(mockRequest, mockResponse)
        expect(response).not.toBeNull()
    })
})