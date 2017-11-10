var Koa = require('koa');
var bodyParser = require('koa-bodyparser');

var app = new Koa();

app.use(bodyParser());

// app.use(async (ctx, next) => {
//     console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
//     await next(); // 调用下一个middleware
// });

// router.get('/hello/:name', async (ctx, next) => {
//     var name = ctx.params.name;
//     ctx.response.body= '<h1>hello ' + name + ' !</h1>';
// })

// router.get('/', async (ctx, next) => {
//     ctx.response.body = `<h1>Index</h1>
//         <form action="/signin" method="post">
//             <p>Name: <input name="name" value="koa"></p>
//             <p>Password: <input name="password" type="password"></p>
//             <p><input type="submit" value="Submit"></p>
//         </form>`;
// })

// router.post('/signin', async (ctx, next) => {
//     var name = ctx.request.body.name || '';
//     var pw = ctx.request.body.password || '';

//     console.log(`signin with name: ${name}, password: ${pw}`);
//     if (name === 'koa' && pw === '12345') {
//         ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
//     } else {
//         ctx.response.body = `<h1>Login failed!</h1>
//         <p><a href="/">Try again</a></p>`;
//     }
// })

var router = require('./config/router')

app.use(router.routes())

app.listen(3001);

console.log('[demo] start-quick is starting at port 3000');