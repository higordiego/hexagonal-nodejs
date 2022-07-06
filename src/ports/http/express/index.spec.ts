
import { Router, Request, Response, NextFunction } from '../interfaces'
import ExpressInit from '.'
import RepositoyRateLimnit from '../../databases/redis/repository/rate-limit'
import RedisClient from '../../databases/redis/connect'
import RateLimit from '../security/rate-limit'

describe('Ports express', () => {
    
    let sut: ExpressInit
    const clientRespository = new RepositoyRateLimnit(new RedisClient('test-redis'))
    const rateLimit = new RateLimit(clientRespository)
    const response: Response =  ({
        status: (_) => {
            return {
                json: () => {}
            }
        }
    }) as Response
    const nest: NextFunction = () => {}
    
    const mockReturnHandler = { data: {response: 'test', callsMade: 1, msg: 'test'}, statusCode: 503 }
    beforeEach(() => {
        const express = {
            use: jest.fn().mockImplementation(() => null),
            listen: jest.fn().mockImplementation(() =>  null),
            disable: jest.fn().mockImplementation(() => null)
        }
        
        sut = new ExpressInit(express, Router(), clientRespository)
        
    })
    
    test('Should express function init existing', async () => {
        expect(sut.initServer).not.toBeNull()
        expect(typeof sut.initServer).toBe('function')
    })
    
    test('Should express init server', async () => {
        expect(sut.initServer()).not.toBeNull()
    })
    
    test('Should express function rate limit handler to be null', async () => {
        const mockRequest = { body: {}, headers: { 'x-forwarded-for': '::1' } } as unknown as Request;
        expect(sut.rateLimitHandler).not.toBeNull()
        expect(typeof sut.rateLimitHandler).toBe('function')
        jest.spyOn(rateLimit, 'verify').mockImplementation(() => new Promise((resolve) => resolve(null)))
        const objHandler = sut.rateLimitHandler(rateLimit)
        expect(typeof objHandler).toBe('function')
        expect(objHandler(mockRequest, response, nest)).not.toBeNull()
    })
    
    test('Should express function rate limit handler error handler', async () => {
        const mockRequest = { body: {}, headers: { }, socket: { remoteAddress: '127.0.0.1'} } as unknown as Request;
        expect(sut.rateLimitHandler).not.toBeNull()
        expect(typeof sut.rateLimitHandler).toBe('function')
        jest.spyOn(rateLimit, 'verify').mockImplementation(() => new Promise((resolve) => resolve(mockReturnHandler)))
        const objHandler = sut.rateLimitHandler(rateLimit)
        expect(typeof objHandler).toBe('function')
        expect(await objHandler(mockRequest, response, nest)).not.toBeNull()
    })
    
})