const Koa = require('koa');
const fs = require('fs');
var PATH = require('path');

const app = new Koa();

/**
 * @params 用Promise封装读取文件的方法
 * @params {string} page为读取的文件名
 * @return {promise}
 */

function render(page) {
    return new Promise((resolve, reject) => {
        let filesPath = `./views/${page}`;
        fs.readFile(filesPath, "binary", (err, data) => {
            if(err) reject(err);
            // console.log(data);
            resolve(data);
        })
    })
}

async function route (url) {
    let view = '404.html';
    switch (url) {
        case '/':
            view = 'index.html';
            break;
        case '/index':
            view = 'index.html';
            break;
        case '/404':
            view = '404.html';
            break;
        case '/todo':
            view = 'todo.html';
            break;
        default:
            view = 'todo.html';
        break;
    }
    let html = await render(view);
    // console.log(html);
    return html;
}

app.use(async (ctx) => {
    let url = ctx.request.url;
    var html = await route(url);
    console.log(html);
    ctx.body = html;
})

app.listen(3000, () => {
    console.log('[demo] route-simple is starting at port 3000')
  })