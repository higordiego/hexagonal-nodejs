import { RedisClientType, createClient } from 'redis'

import { databaseRedisConfig } from '../../../../config/index'

export default class RedisClient {
    private redisClient: RedisClientType | undefined;
    
    private readonly url: string = databaseRedisConfig.host
    private readonly port: string = databaseRedisConfig.port
    private readonly repository: string;
    
    
    constructor(repository: string) {
        this.repository = repository;
    }
    
    private isJSON(value: string): boolean {
        const result = JSON.parse(value)
        return typeof result === 'object'
    }
    
    private jsonToString<Type>(value: Type): string {
        const data = JSON.stringify(value)
        if(!this.isJSON(data)) return '{}'
        return data
    }
    
    private onceError() {
        this.redisClient?.on('error', () => { 
            this.redisClient = undefined
        })
    }
    
    async connection() {
        try {
            if (!this.redisClient?.connect) {
                this.redisClient = createClient({ url: `redis://${this.url}:${this.port}` })
                this.redisClient.connect();
                this.onceError()
            }
        } catch (_) {
            this.redisClient = undefined
        }
    }
    
    checkConnection() {
        const result = this.redisClient?.ping()
        if (!result) {
            this.redisClient = undefined;
            this.connection()
            return;
        }
    }
    
    async getData<Type>(key: string): Promise<Type | null> {
        try {
            const result = await this.redisClient?.hGet(this.repository, key);
            if (result && this.isJSON(result)) {
                return JSON.parse(result)
            }
            return null
        } catch (_) {
            this.checkConnection()
            return null
        }
    }
    
    async incr(value: string) {
        try {
            const result = await this.redisClient?.incr(value)
            if (result) {
                return result
            }
            this.checkConnection()    
            return 0
        } catch (_) {
            this.checkConnection()
            return 0
        }
    }
    
    async keyExpired(value: any, expire: number) {
        try {
            const result = await this.redisClient?.expire(value, expire)
            return result
        } catch (_) {
            this.checkConnection()
            return null
        }
    }
    
    async setData<Type>(key: string, data: Type): Promise<void> {
        try {
            const setData = this.jsonToString(data)
            await this.redisClient?.hSet(this.repository, key, setData)
        } catch (error) {
            this.checkConnection()
        }
    }
}