import FactoryRouters from '../../../adapters/handlers/http';
import { appConfig } from '../../../config/index'
import { RepositoyRateLimnit } from '../../databases/redis/index';
import RateLimit from '../security/rate-limit/index'
import HeadersSecurity from '../security/headers/index'
import PollutionSecurity from '../security/pollution/index'
import * as express from 'express';
import { Request, Response, NextFunction, Router } from '../interfaces/index'
import CompressionPerfomance from '../perfomance/compress';

export default class ExpressInit  {
    private readonly app: any
    private factory: FactoryRouters
    private rateLimit: RateLimit
    private headersSecurity: HeadersSecurity
    private pollutionSecurity: PollutionSecurity
    private compressionPerfomance: CompressionPerfomance

    private readonly urlEncoded = express.urlencoded({ extended: true, limit: appConfig.limitBody })
    private readonly jsonBody = express.json({ limit: appConfig.limitBody })
    
    constructor(app: any, router: Router, repositoryCache: RepositoyRateLimnit) {
        this.app = app
        this.factory = new FactoryRouters(router)
        this.rateLimit = new RateLimit(repositoryCache)
        this.headersSecurity = new HeadersSecurity()
        this.pollutionSecurity = new PollutionSecurity()
        this.compressionPerfomance = new CompressionPerfomance()
    }
    
    rateLimitHandler(rateLimit: RateLimit) {
        return async (req: Request, res: Response, next: NextFunction) => {
            const user = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            const invalid = await rateLimit.verify(user)
            if (invalid) {
                return res.status(invalid.statusCode).json(invalid.data)
            }
            return next()
        }
    }

    
    async initServer(): Promise<void> {
        this.app.use(this.compressionPerfomance.verify())
        this.app.use(this.urlEncoded)
        this.app.use(this.jsonBody)
        this.app.use(this.rateLimitHandler(this.rateLimit))
        this.app.use(this.headersSecurity.verify())
        this.app.use(this.pollutionSecurity.verify())
        this.app.disable(this.headersSecurity.xPoweredBy);
        this.app.use(this.factory.routers())
        this.app.listen(appConfig.nodePort)
    }
}
