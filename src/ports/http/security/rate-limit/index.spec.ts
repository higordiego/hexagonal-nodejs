import RedisClient from '../../../databases/redis/connect'
import RepositoyRateLimnit from '../../../databases/redis/repository/rate-limit'
import RateLimit from '.'

describe('Http ports rate-limit', () => {
    
    const redisClient = new RedisClient('redis-test')

    let respository: RepositoyRateLimnit

    let rateLimitHttp: RateLimit

    beforeEach(() => {
        jest.spyOn(redisClient, 'connection').mockImplementation(() => new Promise((resolve) => resolve()));
        respository = new RepositoyRateLimnit(redisClient);
        rateLimitHttp = new RateLimit(respository)
    })

    test('should to increment the rate limit counted 1', async () => {
        jest.spyOn(respository, 'incrStartTimeUserRequest').mockImplementation(() => new Promise((resolve) => resolve(1)));
        const result = await rateLimitHttp.verify('test-key')
        expect(result).toBeNull()
    })

    test('should to increment the rate limit counted 10001', async () => {
        jest.spyOn(respository, 'incrStartTimeUserRequest').mockImplementation(() => new Promise((resolve) => resolve(10001)));
        const result: any = await rateLimitHttp.verify('test-key')
        const responseEqual = {data: {"callsMade": 10001, "msg": "Too many calls made", "response": "Error"}, statusCode: 503}
        expect(result.data).toEqual(responseEqual.data)
        expect(result.statusCode).toBe(responseEqual.statusCode)
    })
})