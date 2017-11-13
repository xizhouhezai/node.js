const Koa = require('koa')
const app = new Koa()
const router = require('./config/router')
const bodyParser = require('koa-bodyparser')

app.use(bodyParser());

app
.use(router.routes());

app.listen(3001);

console.log('[demo] start-quick is starting at port 3001');