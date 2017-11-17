const Koa = require('koa');
const koaSessionMinimal = require('koa-session-minimal');
const koaMysqlSession = require('koa-mysql-session');
const router = require('koa-router')();

const app = new Koa();

let store = new koaMysqlSession({
    user: 'root',
    password: 'root',
    database: 'koa_demo',
    host: '127.0.0.1',
})


// 存放sessionId的cookie配置
let cookie = {
    maxAge: '', // cookie有效时长
    expires: '',  // cookie失效时间
    path: '', // 写cookie所在的路径
    domain: '', // 写cookie所在的域名
    httpOnly: '', // 是否只用于http请求中获取
    overwrite: '',  // 是否允许重写
    secure: '',
    sameSite: '',
    signed: '',
  }

// 使用session中间件koa-session-minimal
app.use(koaSessionMinimal({
    key: 'SESSION_ID',
    store: store,
    cookie: cookie,
}))

router.get('/set',async (ctx, next) => {
    ctx.session = {
        user_id: Math.random().toString(36).substr(2),
        count: 0,
    }
    ctx.body = ctx.session;
    await next();
})

router.get('/',async (ctx, next) => {
    // 读取session
    ctx.session.count = ctx.session.count + 1;
    ctx.body = ctx.session
})

app.use(router.routes())

app.listen(3034, () => {
    console.log('[demo] session is starting at port 3034')
  })
