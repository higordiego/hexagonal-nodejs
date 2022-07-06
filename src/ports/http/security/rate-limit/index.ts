import RepositoyRateLimnit from '../../../databases/redis/repository/rate-limit';
import { rateLimit } from '../../../../config';

export default class RateLimit {

    private numberRateLimit: number = Number(rateLimit.equalLimit)
    
    constructor(private _repository: RepositoyRateLimnit) {}

    async verify<Type>(user: Type) {
        const client = await this._repository.incrStartTimeUserRequest(user)
        if (client === 1) {
            await this._repository.expiredStartTimeUseRequest(user)
        }
        
        if (client > this.numberRateLimit) {
            return { data: { response: 'Error', callsMade: client, msg: 'Too many calls made' }, statusCode: 503 }
        }

        return null
    }
}