let Koa = require('./application')

let app = new Koa()

app.use(function (req, res) {
  res.writeHead(200)
  res.end('hello world')
})

app.listen(3333, function () {
  console.log('listening on 3333')
})