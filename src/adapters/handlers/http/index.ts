import * as path from 'path'
import * as fs from 'fs'
import { Router } from '../../../ports/http/interfaces';
import { adapterConfig, appConfig } from '../../../config';
import { RouteClass } from './interfaces/http';

export default class FactoryRouters {
    
    private router: Router
    
    private readonly folderPath: string =  path.join(__dirname, adapterConfig.fileRoute)
    
    constructor(router: Router) {
        this.router = router;
    }
    
    private listFolders() {
        return fs.readdirSync(this.folderPath)
    }
    
    private async importModulesDinamic(filesRoutes: string[], dirFile: string) {
        let arrayObject: RouteClass[] = []
        for (const iterator of filesRoutes) {
            if (iterator.indexOf('spec') < 0) {
                const result = await import(`${this.folderPath}/${dirFile}/${iterator}`)
                arrayObject.push(new result.default())
            }
        }
        return arrayObject
    }
    
    private async filesRoutes(listFolders: string[]) { 
        let arrayFiles: RouteClass[] = []
        for (const iterator of listFolders) {
            const fileRoutes = fs.readdirSync(`${this.folderPath}/${iterator}`)
            arrayFiles = [...arrayFiles, ...await this.importModulesDinamic(fileRoutes, iterator)]
        }
        return arrayFiles
    }
    
    async routers() {
        const readFiles = this.listFolders()
        const importRoutes = await this.filesRoutes(readFiles)
        for (const iterator of importRoutes) {
            this.router[iterator.method](`${appConfig.initRoute}${iterator.url}`, iterator.handler)
        }
        return this.router
    }
}