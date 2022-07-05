const express = require('express')
const app = express()
const path = require('path')
const proxy = require('express-http-proxy')
const url = require('url')

app.use((req, res, next) => {
  if (req.path !== '/' && !/\w*\.\w*/.test(req.path) && !/^\/api/.test(req.path)) {
    const u = url.parse(req.url)
    req.url = u.pathname.replace(/\/$/, '') + '.html' + (u.search || '')
  }
  next()
})

app.use(
  express.static(path.resolve(__dirname, 'dist'), {
    index: ['/study.html']
  })
)

app.use('/api', proxy('http://101.43.17.119:8080'))

app.listen(9000, '0.0.0.0', () => {
  console.log('Server is listening on port:', 9000)
})