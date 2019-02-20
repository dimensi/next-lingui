const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser')
const linguiMiddleware = require('./lib/middleware')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const options = {
  locales: ['ru', 'en'],
  defaultLocale: 'ru',
  subPaths: true,
  ignoreRoutes: ['_next', 'static']
}
async function start () {
  await app.prepare()
  const server = express()
  server.use(cookieParser())
  server.use(linguiMiddleware(options, app))

  server.get('*', (req, res) => handle(req, res))

  await server.listen(port)
  console.log(`> Ready on http://localhost:${port}`)
}

start()
