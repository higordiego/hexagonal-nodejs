
import * as hpp from 'hpp'

export default class PollutionSecurity {
    private _hpp = hpp.default

    verify() {
        return this._hpp()
    }
}