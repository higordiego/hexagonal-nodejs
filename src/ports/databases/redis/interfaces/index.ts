import RepositoyRateLimnit from '../repository/rate-limit'
import RedisClient from '../connect'

export type RespositoriesCached = {
    RepositoyRateLimnit: RepositoyRateLimnit
    RedisClient: RedisClient
}