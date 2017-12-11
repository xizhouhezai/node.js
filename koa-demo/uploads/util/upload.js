var Busboy = require('busboy');
var inspect = require('util').inspect;
var path = require('path');
var fs = require('fs');


/**
 * 同步创建文件目录
 * @param  {string} dirname 目录绝对地址
 * @return {boolean}        创建目录结果
 */
function mkdirsSync( dirname ) {
    if (fs.existsSync( dirname )) {
      return true
    } else {
      if (mkdirsSync( path.dirname(dirname)) ) {
        fs.mkdirSync( dirname )
        return true
      }
    }
  }


/**
 * 
 * @param {string} fileName 上传的文件名
 * @return {string} 返回一个文件的后缀名 
 */

function getSuffixName (fileName) {
    let nameList = fileName.split('.');
    console.log("文件后缀名：" + nameList[nameList.length - 1]);
    return nameList[nameList.length - 1];
}


/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @param  {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}         
 */

function uploads (ctx, options) {
    // 获取node原生的请求事件和响应事件
    let req = ctx.req
    let res = ctx.res

    let busboy = new Busboy({headers: req.headers})

    // 获取文件类型
    let fileType = options.filetype || 'common';
    // 文件储存路径
    let filePath = path.join(options.path, fileType);
    // 创建文件存放的目录
    let mkdirResult = mkdirsSync( filePath )

    return new Promise((resolve, reject) => {
        console.log('文件上传中...')
        let result = { 
          success: false,
          formData: {},
        }

        // 解析请求的文件事件
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            // 为上传的文件重新命名
            let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename);
            
            let _uploadFilePath = path.join( filePath, fileName );
            let saveTo = path.join(_uploadFilePath);

            // 将文件存放到指定的路径
            file.pipe(fs.createWriteStream(saveTo));

            // 文件写入事件结束
            file.on('end', () => {
                result.success = true;
                result.message = '文件上传成功';

                console.log('文件上传成功！');
                resolve(result);
            })
        })

        // 解析表单中其他的字段
        busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
            console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val));
            result.formData[fieldname] = inspect(val);
        })

        // 解析事件结束
        busboy.on('finish', () => {
            console.log('文件上结束')
            resolve(result)
        })

        // 监听错误事件

        busboy.on('error', (err) => {
            console.log(console.log('文件上出错'))
            reject(result);
        })

        req.pipe(busboy)
    })
}

module.exports = {
    uploads
}
