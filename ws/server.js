var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({port: 8181})

wss.on('connection', function(ws){
    console.log('client is connected')
    ws.on('message', function (message) {
        console.log(message)
        ws.send(JSON.stringify(message))
    })
})