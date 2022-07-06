
import { createLogger, Logger, format, transports } from "winston"
import { appConfig } from "../../../config";


export default class LoggerWinston {
    
    private log: Logger

    constructor() {
        this.log = createLogger({
            format: format.combine(format.timestamp(), format.json()),
            defaultMeta: {
                service: appConfig.appName,
            },
            transports: [new transports.Console({})],
        });
    }
    

    info<Type>(data: Type) {
        return this.log.info(data)
    }

    error<Type>(data: Type) {
        return this.log.error(data)
    }

    warn<Type>(data: Type) {
        return this.log.warn(data)
    }
}
