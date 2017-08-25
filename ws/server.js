var WebSocketServer = require('ws')
var WebSocket = WebSocketServer.Server
var fs = require('fs')
var path = require('path')
var wss = new WebSocket({
    port: 8181,
    verifyClient: socketVerify
})
var uuid = require('node-uuid')
var clients = [] //储存发送给客户端的数据
var clientIndex = 1 //客户端链接的序号
const DATA_PATH = path.join(__dirname, 'data.json')
// console.log(DATA_PATH)

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
        // console.log(message)
        fs.readFile(DATA_PATH, function(err, data){
            if (err) {
                console.error(err)
                process.exit(1)
            }
            // console.log(data)
            var oldMessges = JSON.parse(data)
            console.log(oldMessges)
            var newMessges = {
                id: client_uuid,
                nickname: nickname,
                message: message
            }
            oldMessges.push(newMessges)
            console.log(oldMessges)
            fs.writeFile(DATA_PATH, JSON.stringify(oldMessges, null, 4), function (err) {
                if (err) {
                    console.error(err)
                    process.exit(1)
                }
            })
        })
        wsSend(client_uuid, nickname, message)
    })
})
