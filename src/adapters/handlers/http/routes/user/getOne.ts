import { Request, Response } from "../../../../../ports/http/interfaces/index";
import LoggerWinston from "../../../../../ports/logger/winston";
export default class RouteHttpGetOneUse{
    
    public readonly url = '/user'
    public readonly method = 'get'
    constructor(private readonly _log: LoggerWinston) { }
    
    private loggerInput<Type>(url: string, method: string, body: Type) {
        this._log.info({ url: url, method: method, body: body })
    }
    
    public handler(req: Request, res: Response) {
        this.loggerInput(req.url, req.method, req.body)
        return res.status(200).json({ title: 'vivo!' });
    }
}
