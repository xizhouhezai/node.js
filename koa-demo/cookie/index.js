const Koa = require('koa');
const app = new Koa();
var router = require('koa-router')();

router.get('/index', async (ctx, next) => {
    ctx.cookies.set('cid', 'hello world', {
        domain: 'localhost',  // 写cookie所在的域名
        path: '/index',       // 写cookie所在的路径
        maxAge: 10 * 60 * 1000, // cookie有效时长
        expires: new Date('2017-11-16'),  // cookie失效时间
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
    })
    ctx.body="cookie is ok";
})

app.use(router.routes());

app.listen(3033)

console.log('[demo] route-simple is starting at port 3033');