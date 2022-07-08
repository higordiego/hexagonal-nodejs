
import * as compress from 'compression';

export default class CompressionPerfomance {
    private _compresssion = compress.default

    verify() {
        return this._compresssion()
    }
}