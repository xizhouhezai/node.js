const Koa = require('koa');
const router = require('koa-router')();

const app = new Koa();

router.get('/getData.jsonp', async (ctx) => {
    // 获取jsonp的callback
    let callbackName = ctx.query.callback || 'callback';
    let returnData = {
      success: true,
      data: {
        text: 'this is a jsonp api',
        time: new Date().getTime(),
      }
    }

    let jsonpStr = `;${callbackName}(${JSON.stringify(returnData)})`;

    ctx.type = 'text/javascript';
    ctx.body = jsonpStr;
})

app.use(router.routes());

app.listen(3003, () => {
    console.log('[demo] route-simple is starting at port 3003');
})
