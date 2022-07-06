import { config } from 'dotenv'
import { getEnv } from './environments'
config()

const momentConfig = {
  timezone: getEnv('TIMEZONE', 'America/Sao_Paulo')
}

const envProdName = 'production'

const databasePostgresConfig = {
  databaseUrl: getEnv('DATABASE_URL')
}

const appConfig = {
  appName: getEnv('APP_NAME', 'apontamento-horas'),
  isProduction: getEnv('NODE_ENV') === envProdName,
  envName: getEnv('NODE_ENV'),
  nodePort: getEnv('NODE_PORT', '3000'),
  initRoute: getEnv('INIT_ROUTE', '/api'),
  limitBody: getEnv('NODE_LIMIT_BODY', '1kb')
}

const jwtEngine = {
  secret: getEnv('JWT_SECRET', 'secret'),
  algorithm: getEnv('JWT_ALGORITHM', 'HS256'),
  numberExpired: getEnv('JWT_EXPIRATION_SECONDS', '1800')
}

const databaseRedisConfig = {
  port: getEnv('DATABASE_REDIS_PORT', '6379'),
  host: getEnv('DATABASE_REDIS_HOST', 'localhost')
}

const encrypteEngine = {
  secret: getEnv('ENCRYPT_SECRET', 'secret'),
}
const adapterConfig = {
  fileRoute: getEnv('ADAPTER_FILE_ROUTING', '/routes')
}

const rateLimit = {
  equalLimit: getEnv('RATE_LIMIT', '1000')
}


export {
  appConfig,
  envProdName,
  momentConfig,
  databasePostgresConfig,
  jwtEngine,
  encrypteEngine,
  databaseRedisConfig,
  adapterConfig,
  rateLimit
}