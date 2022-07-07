import LoggerWinston from '../../../../../ports/logger/winston';
import { appConfig } from '../../../../../config';
import { Router } from '../../../../../ports/http/interfaces';

import GetOneUser from './getOne'


export default class RouterUser {
    
    private getOneUser: GetOneUser
    constructor(private router: Router) {
        this.getOneUser = new GetOneUser(new LoggerWinston());
    };

    mounted() {
        this.router[this.getOneUser.method](`${appConfig.initRoute}${this.getOneUser.url}`, this.getOneUser.handler.bind(this.getOneUser))
        return this.router
    }
    
}