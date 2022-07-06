import * as jwt from 'jsonwebtoken';

import { jwtEngine } from '../../config/index'

export default class Jwt {
    private readonly secret: string = jwtEngine.secret;
    private readonly algorithm: any = jwtEngine.algorithm;
    private readonly expired: number = Number(jwtEngine.numberExpired);
    
  generateJwtToken (id: number) {
    return jwt.sign({ id: id }, this.secret, { algorithm: this.algorithm, expiresIn: this.expired });
  }

  generateJwtRefreshToken(id: number) {
    return jwt.sign({ id: id }, this.secret, { algorithm: this.algorithm, expiresIn: this.expired * 1.5 });
  }

  verify (tokenJwt: string) {
    try {
      const payload = jwt.verify(tokenJwt, this.secret)
      return payload
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  
}