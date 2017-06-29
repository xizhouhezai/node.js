var WebSocketServer = require('ws')
var WebSocket = WebSocketServer.Server
var wss = new WebSocket({
    port: 8181,
    verifyClient: socketVerify
})
var uuid = require('node-uuid')
var clients = [] //储存发送给客户端的数据
var clientIndex = 1 //客户端链接的序号

function wsSend (client_uuid, nickname, message) {
    for (var i = 0; i < clients.length; i++) {
        var clientSocket = clients[i].ws;
        console.log(clients[i].id)
        console.log(WebSocketServer.OPEN)
        if (clientSocket.readyState === WebSocketServer.OPEN) {
            clientSocket.send(JSON.stringify({
                "id": client_uuid,
                "nickname": nickname,
                "message": message
            }));
        }
    }
}

function socketVerify (info) {
    return true
}
wss.on('connection', function(ws){
    console.log('client is connected')
    var client_uuid = uuid.v4();
    var nickname = "AnonymousUser" + clientIndex;
    clientIndex += 1
    clients.push({'id': client_uuid, 'ws': ws, 'nickname': nickname})
    console.log('client [%s] connected', client_uuid);
    ws.on('message', function (message) {
        console.log(message)
        wsSend(client_uuid, nickname, message)
    })
})
