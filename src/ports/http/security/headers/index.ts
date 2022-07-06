
import * as helmet from 'helmet'

export default class HeadersSecurity {

    private _helmet = helmet.default

    public readonly xPoweredBy: string = 'x-powered-by'

    verify() {
        return this._helmet()
    }
}