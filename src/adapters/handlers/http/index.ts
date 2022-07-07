import { Router } from '../../../ports/http/interfaces';
import RouterUser from './routes/user';

export default class FactoryRouters {
    
    private router: Router
    private routerUser: RouterUser
    
    constructor(router: Router) {
        this.router = router;
        this.routerUser = new RouterUser(router);
    }
    
    routers() {
        this.router.use(this.routerUser.mounted())
        return this.router
    }
}