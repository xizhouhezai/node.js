const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

const app = new Koa();
app.use(bodyParser());

router.get('/getString.json', async (ctx, next) => {
    let result = {
        success: true,
        data: 'this is string data',
    }
    ctx.body = result;
    await next();
})
router.get('/getNumber.json', async (ctx, next) => {
    let result = {
        success: true,
        data: 123456,
    }
    ctx.body = result;
    await next();
})
router.post('/postData.json', async (ctx, next) => {
    let result = {
        success: true,
        data: 'ok',
    }
    ctx.body = result;
    await next();
})

app.use(router.routes());

module.exports = app;

app.listen(3003, () => {
    console.log('[demo] test-unit is starting at port 3003')
})
