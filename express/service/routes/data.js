var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var config = require('../config');

var dataPath = path.join(config.PATH, 'public/data/');

/* 读取数据 */
router.get('/read', function(req, res, next) {
  var Type = req.query.type || '';
  fs.readFile(dataPath + Type +'.json', function(err, data) {
    if (err) {
      return res.send({
        status: 0,
        info: "读取文件出现异常",
      })
    }
    const COUNT = 50;
    var resoure = JSON.parse(data.toString());
    if (resoure.length > COUNT) {
      resoure = resoure.slice(0, COUNT);
    }
    return res.send({
      status: 1,
      data: resoure
    })
  })
});

// 存储数据

router.get('/write', function(req, res, next) {
  var Type = req.query.type || '';
  var Name = req.query.name || '';
  var Img = req.query.img || '';
  fs.readFile(dataPath + Type +'.json', function(err, data) {
    if (!Type || !Name || !Img) {
      return res.send({
        status: 0,
        info: '提交的字段不全',
      })
    }
    var oldData = JSON.parse(data);
    var newData = {
      type: Type,
      name: Name,
      img: Img,
      date: new Date(),
    }

    oldData.push(newData);

    fs.writeFile(dataPath + Type +'.json', JSON.stringify(oldData), function(err){
      if(err){
        return res.send({
          status:0,
          info: '写入文件失败'
        });
      }
      return res.send({
        status:1,
        info: oldData
      });
    })

  })
});

module.exports = router;