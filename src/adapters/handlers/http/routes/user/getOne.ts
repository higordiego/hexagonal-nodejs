import { Request, Response } from "../../../../../ports/http/interfaces/index";
import LoggerWinston from "../../../../../ports/logger/winston";

export default class RouteHttpGetOneUse {

    public readonly url = '/user'
    public readonly method = 'get'

    constructor() {}

    public handler(req: Request, res: Response) {
        return res.status(200).json({ title: 'vivo!' });
    }
}
