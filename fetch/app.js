var express = require('express');
var app = express();
var fetch = require('fetch')

app.get('/',function(req,res){
    fetch('http://music.163.com').then(function(response){
        res.send(response)
    })
})

var server = app.listen('3000',function(){
                var host = server.address().address
                var port = server.address().port
                console.log(server.address())
                console.log("server listening at http://%s:%s", host, port)
            })
