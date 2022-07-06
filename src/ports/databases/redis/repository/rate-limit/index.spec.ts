import RedisClient from '../../connect'
import RepositoyRateLimnit from '.'

describe('Repository rate-limit', () => {
    
    const redisClient = new RedisClient('redis-test')

    let respository: RepositoyRateLimnit

    beforeEach(() => {
        respository = new RepositoyRateLimnit(redisClient);
    })

    test('should to increment the rate limit', async () => {
        jest.spyOn(redisClient, 'incr').mockImplementation(() => new Promise((resolve) => resolve(0)));
        const result = await respository.incrStartTimeUserRequest('test-key')
        expect(result).toBe(0)
    })

    test('should to expired user the rate limit', async () => {
        jest.spyOn(redisClient, 'keyExpired').mockImplementation(() => new Promise((resolve) => resolve(null)));
        const result = await respository.expiredStartTimeUseRequest('test-key')
        expect(result).toBeNull()
    })
})