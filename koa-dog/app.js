var Koa = require( 'koa' );
var app = new Koa();
var bodyParser = require( 'koa-bodyparser' );
var router = require( './route/router' );



app.use(bodyParser());

app.use(router.routes())

app.listen(3333);

console.log('app is run, and listen localhost: 3333');