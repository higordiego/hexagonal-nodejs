import Encrypter from './index'


describe('Encyrpted hash', () => {

    let comparHash: string = ''
    let password: string = 'password'
    beforeEach(() => {
        const sut = new Encrypter()
        comparHash = sut.encrypt(password)
    })
    
    test('Should emcrypted string return hash', () => {
        const sut = new Encrypter()
        const hash = sut.encrypt(password)
        expect(hash).not.toBeNull()
    })

    test('Should decrypt string return password', () => {
        const sut = new Encrypter()
        const password = sut.decrypt(comparHash)
        expect(password).not.toBeNull()
        expect(password).toBe(password)
    })
})