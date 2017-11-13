const sleep = async (ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, ms)
    })
  }
module.exports = {
    async login (ctx, next) {
        var loginHtml = `<h1>Index</h1>
            <form action="/signin" method="post">
                <p>Name: <input name="name" value="koa"></p>
                <p>Password: <input name="password" type="password"></p>
                <p><input type="submit" value="Submit"></p>
            </form>`;
        ctx.response.body = loginHtml;
        await next();
    },
    async signin (ctx, next) {
        var
            name = ctx.request.body.name || '',
            password = ctx.request.body.password || '';
        console.log(`signin with name: ${name}, password: ${password}`);
        if (name === 'koa' && password === '12345') {
            ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
        } else {
            ctx.response.body = `<h1>Login failed!</h1>
            <p><a href="/">Try again</a></p>`;
        }
        await next();
    },
    async profile (ctx, next) {
        var name = ctx.params.name;
        ctx.response.body= '<h1>hello ' + name + ' !</h1>';
        await next();
    }
}