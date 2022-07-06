import { 
  appConfig, momentConfig, 
  envProdName, databasePostgresConfig, 
  databaseRedisConfig, jwtEngine,
  encrypteEngine, adapterConfig, rateLimit
} from './index'

describe('config', () => {
  test('momentConfig', () => {
    expect(momentConfig).toHaveProperty('timezone', 'America/Sao_Paulo')
  })
  
  test('envProdName', () => {
    expect(envProdName).toBe('production')
  })

  test('appConfig', () => {
    expect(appConfig).toHaveProperty('appName', 'apontamento-horas')
    expect(appConfig).toHaveProperty('isProduction', false)
    expect(appConfig.isProduction).not.toBeUndefined()
    expect(appConfig.isProduction).not.toBeNull()
    expect(appConfig).toHaveProperty('envName', 'test')
    expect(appConfig).toHaveProperty('initRoute', '/api')
    expect(appConfig).toHaveProperty('limitBody', '1kb')
  })

  test('databaseConfig', () => {
    expect(databasePostgresConfig).toHaveProperty('databaseUrl');
  })

  test('jwtEngine', () => {
    expect(jwtEngine).toHaveProperty('secret', 'secret')
    expect(jwtEngine).toHaveProperty('algorithm', 'HS256')
    expect(jwtEngine).toHaveProperty('numberExpired', '1800')
  })

  test('encrypteEngine', () => {
    expect(encrypteEngine).toHaveProperty('secret', 'secret')
  })

  test('databaseRedisConfig', () => {
    expect(databaseRedisConfig).toHaveProperty('port', '6379')
    expect(databaseRedisConfig).toHaveProperty('host', 'localhost')
  })

  test('adapterConfig', () => {
    expect(adapterConfig).toHaveProperty('fileRoute');
    expect(adapterConfig).toHaveProperty('fileRoute', '/routes')
  })

  test('rateLimit', () => {
    expect(rateLimit).toHaveProperty('equalLimit');
    expect(rateLimit.equalLimit).toBe("1000")
  })
  
})