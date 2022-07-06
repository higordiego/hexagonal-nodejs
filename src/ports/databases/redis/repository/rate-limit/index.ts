import RedisClient from "../../connect";


export default class RepositoyRateLimnit {

    private expired: number = 60;

    constructor(private readonly connectionRedis: RedisClient) {
        this.connectionRedis.connection()
    }

    async incrStartTimeUserRequest(key: any) {
        return this.connectionRedis.incr(key)
    }

    async expiredStartTimeUseRequest(key: any) {
        return this.connectionRedis.keyExpired(key, this.expired)
    }

}