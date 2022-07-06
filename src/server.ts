import express, { Router } from 'express'
import ExpressInit from './ports/http/express'
import RedisClient from './ports/databases/redis/connect'
import RepositoyRateLimnit from './ports/databases/redis/repository/rate-limit'

const app = express();

const router = Router()

app.use(express.json())

const repositoryRateLimit = new RepositoyRateLimnit(new RedisClient('rate-limit'))
const server = new ExpressInit(app, router, repositoryRateLimit);


server.initServer()