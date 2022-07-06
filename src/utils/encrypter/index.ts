import * as CryptoJS from 'crypto-js'
import { encrypteEngine } from '../../config/index'

export default class Crypto {
    
    private readonly secret: string = encrypteEngine.secret
    
    encrypt (content: string) {
        const encryptedContent = CryptoJS.AES.encrypt(content, this.secret)
        return encryptedContent.toString()
    }
    
    decrypt(encryptedContent: string) {
        const bytes = CryptoJS.AES.decrypt(encryptedContent, this.secret)
        return bytes.toString(CryptoJS.enc.Utf8)
    }
}
