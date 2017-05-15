'use strict';
const { createServer } = require('http')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
,     app = next({ dev })
,     handle = app.getRequestHandler()
,     port = process.env.GM_PORT || 8010
,     express = require('express')
,     bodyParser = require('body-parser')
// ,     MobileDetect = require('mobile-detect')


app.prepare().then(() => {
  const server = express()

  // parse application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  server.use(bodyParser.json())


  if(dev){
    server.use((req, res , next) => {
      if(!/^\/(_next|gstatic|__webpack_hmr|_webpack)/.test(req.originalUrl))
        console.log(req.originalUrl, req.query, req.body)
      next()
    })
  }

  // server.use('/gstatic', express.static('gstatic'))

  // server.get('/gm/nescafe/:playlist/:track', (req, res) => app.render(req, res, '/nescafe', Object.assign({}, req.query, req.params)))

  // server.get('/gm/*', (req, res) => {
  //   let url = req._parsedUrl.pathname.replace('/gm', '')
  //   let md = new MobileDetect(req.headers['user-agent'])
  //   return app.render(req, res, url, Object.assign({ isMobile: md.mobile() }, req.query))
  // })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (e) => {
    if(e)
      throw e

    console.log(`Server is up on ${port}`)
  })
})
