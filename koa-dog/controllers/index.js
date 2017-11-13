module.exports = {
    async signup (ctx, next) {
        ctx.response.body = `<h1>111111</h1>`
        await next();
    },
    async verify (ctx, next) {
        ctx.response.body = {
            status: 1,
            items: 'content',
        }
        await next();
    },
    async update (ctx, next) {
        ctx.response.body = {
            status: 1,
            items: 'content',
        }
        await next();
    }
}