var Koa = require('koa');
var bodyParser = require('koa-bodyparser');
var inspect = require('util').inspect;
var router = require('koa-router')();
var fs = require('fs');
var path = require('path');

var app = new Koa();

var { uploads } = require('./util/upload');

app.use(bodyParser());

router.get('/', async (ctx, next) => {
    let html =`
        <h1>koa2 upload demo</h1>
        <form method="POST" action="/upload.json" enctype="multipart/form-data">
        <p>file upload</p>
        <span>picName:</span><input name="picName" type="text" /><br/>
        <input name="file" type="file" /><br/><br/>
        <button type="submit">submit</button>
        </form>
    `;
    ctx.body = html;
    await next();
})

router.post('/upload.json',async (ctx, next) => {
    let result = {
        success: false
    }
    // 文件存放目录
    let serverFilePath = path.join(__dirname, 'upload-files');

    // 上传文件的方法

    result = await uploads(ctx, {
        fileType: 'album',
        path: serverFilePath
    })

    ctx.body = result;
    
})

app.use(router.routes());

app.listen(3003, () => {
    console.log('[demo] upload-simple is starting at port 3003');
})
