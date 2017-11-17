var Koa = require('koa');
var busBoy = require('busboy');
var inspect = require('util').inspect;
var fs = require('fs');

var app = new Koa();

// req为node的原生请求
var busboy = new busBoy({headers: req.headers})

// 监听文件解析事件
busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    console.log(`File [${fieldname}]: filename: ${filename}`);

    // 文件保存路径
    file.pipe(fs.createWriteStream('./upload'));

    // 开始解析文件流
    file.on('data', (data) => {
        console.log(`File [${fieldname}] got ${data.length} bytes`)
    })

    // 文件解析结束
    file.on('end', () => {
        console.log(`File [${fieldname}] Finished`)
    })
})

// 监听请求中的字段

busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated) => {
    console.log(`Field [${fieldname}]: value: ${inspect(val)}`)
})

// 监听事件结束

busboy.on('finish', () => {
    console.log('Done parsing form!')
    res.writeHead(303, { Connection: 'close', Location: '/' })
    res.end()
})

req.pipe(busboy)