import express from 'express'
import next from 'next'
import cookieParser from 'cookie-parser'
import { createMiddleware } from '../lib/middleware'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const options = {
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  subPaths: true,
  ignoreRoutes: ['_next', 'static'],
}

async function start () {
  await app.prepare()
  const server = express()
  server.use(cookieParser())
  server.use(createMiddleware(options))

  server.get('*', (req, res) => handle(req, res))

  await server.listen(port)
  console.log(`> Ready on http://localhost:${port}`)
}

start()
