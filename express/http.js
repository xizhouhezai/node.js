var express = require('express')
var app = new express()
var cookieParser = require('cookie-parser')

app.use(cookieParser())

app.get('/', function(req, res){
    if (req.cookies.isVisit) {
            console.log(req.cookies);
            res.send("再次欢迎访问");
        } else {
            res.cookie('isVisit', 1, {maxAge: 60 * 1000});
            res.send("欢迎第一次访问");
        }
})

var server = app.listen('3000', function(){
    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)
})