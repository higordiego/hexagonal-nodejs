
import JwtGenerate from './index'

describe('Token JWT Generator', () => {

    let accessToken: string =  ''
    let refreshToken: string = ''
    
    beforeEach(() => {
        const sut = new JwtGenerate()
        accessToken = sut.generateJwtToken(1)
        refreshToken = sut.generateJwtToken(1)
    })
    test('Should JWT generate access token return not null', async () => {
        const sut = new JwtGenerate()
        const token = sut.generateJwtToken(1)
        expect(token).not.toBeNull()
    })

    test('Should JWT generate refresh token return not null', async () => {
        const sut = new JwtGenerate()
        const token = sut.generateJwtRefreshToken(1)
        expect(token).not.toBeNull()
    })

    test('Should JWT verify refresh token return not null', async () => {
        const sut = new JwtGenerate()
        const token: any = sut.verify(refreshToken)
        expect(token).not.toBeNull()
        expect(token.id).toBe(1)
    })

    test('Should JWT verify access token return not null', async () => {
        const sut = new JwtGenerate()
        const token: any = sut.verify(accessToken)
        expect(token).not.toBeNull()
        expect(token.id).toBe(1)
    })

    test('Should JWT pass token invalid return error', async () => {
        const sut = new JwtGenerate()
        expect(() => {sut.verify('')}).toThrow(Error);
    })
})