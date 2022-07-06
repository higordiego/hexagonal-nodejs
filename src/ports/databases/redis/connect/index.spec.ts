let errorConnection = false
jest.mock("redis", () => {
    return {
        createClient: () => {
            return {
                connect: jest.fn((_) => {
                    if (errorConnection) throw new Error("Connection failed")
                }),
                ping: jest.fn(),
                hGet: jest.fn(async (_, repo) => {
                    if (repo == 'repo') {
                        return JSON.stringify({name: "test"})
                    }
                    if (repo === 'error') {
                        throw new Error('error mock')
                    }
                    return null
                    
                }),
                on: jest.fn(),
                hSet: jest.fn((_, key) => {
                    if (key == 'error') throw new Error('error mock')
                    return 
                }),
                incr: jest.fn(async (key) => {
                    if (key == 'error') throw new Error('error mock')
                    if (key == '2') return undefined
                    return key
                }),
                expire: jest.fn((_, val: number) => {
                    if (val == 1) throw new Error('error mock')
                    return val
                })
            }
        }
    }
})

import RedisClient from '.'

describe('RedisClient class', () => {
    
    let sut: RedisClient
    beforeEach(() => {
        sut = new RedisClient('repository-test')
    })
    
    
    test('Should redis client get data return object', async () => {
        await sut.connection()
        const result:any = await sut.getData('repo')
        expect(result).not.toBeNull();
        expect(result.name).toBe('test')
    })
    
    test('Should redis client get data return null', async () => {
        await sut.connection()
        const result:any = await sut.getData('')
        expect(result).toBeNull();
    })
    
    test('Should redis client get data return force erro throw', async () => {
        await sut.connection()
        const result:any = await sut.getData('error')
        expect(result).toBeNull();
    })
    
    test('Should redis set data return null', async () => {
        await sut.connection()
        const result = await sut.setData('repo', '{a, b, c}')
        expect(result).not.toBeNull()
    })
    
    test('Should redis set data in json valid return null', async () => {
        await sut.connection()
        const result = await sut.setData('repo', {name: 'higor'})
        expect(result).not.toBeNull()
    })
    
    test('Should redis set data force error throew', async () => {
        await sut.connection()
        const result = await sut.setData('error', {name: 'higor'})
        expect(result).not.toBeNull()
    })
    
    test('Should redis not execution connection set data', async () => {
        const result = await sut.setData('error', {name: 'higor'})
        expect(result).not.toBeNull()
    })
    
    test('Should redis client  not execution connection get data', async () => {
        const result:any = await sut.getData('error')
        expect(result).toBeNull();
    })
    
    test('Should redis client  multiple execution connection', async () => {
        const oneConnection = await sut.connection()
        const twoConnection = await sut.connection()
        expect(oneConnection).not.toBeNull()
        expect(twoConnection).not.toBeNull()
    })
    
    test('Should redis client check connection', async () => {
        await sut.connection()
        const check = sut.checkConnection()
        expect(check).not.toBeNull()
    })
    
    test('Should redis client check connection not execution function connection', async () => {
        const check = sut.checkConnection()
        expect(check).not.toBeNull()
    })
    
    test('Should redis client incr function return value valid', async () => {
        await sut.connection()
        const response = await sut.incr('1')
        expect(response).not.toBeNull()
        expect(response).toBe('1')
    })
    
    test('Should redis client incr function return value undefined', async () => {
        await sut.connection()
        const response = await sut.incr('2')
        expect(response).not.toBeNull()
        expect(response).toBe(0)
    })
    
    test('Should redis client incr function return throw execption', async () => {
        await sut.connection()
        const response = await sut.incr('error')
        expect(response).not.toBeNull()
    })
    
    test('Should redis client expire function return value valid', async () => {
        await sut.connection()
        const response = await sut.keyExpired('1', 1)
        expect(response).toBeNull()
    })
    
    test('Should redis client throw error connnection', async () => {
        errorConnection = true
        expect(await sut.connection()).not.toBeNull()
    })
    
    test('Should redis client throw error connnection', async () => {
        errorConnection = false
        // errorOnce = true
        // 2expect(await sut.connection()).not.toBeNull()
    })  
})