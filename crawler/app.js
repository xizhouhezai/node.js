var express = require('express');
var app = express();
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


// var cookie = "_ntes_nnid=45eeaf8544f154fe393bf3c814879da2,1493689207006; _ntes_nuid=45eeaf8544f154fe393bf3c814879da2; _ga=GA1.2.2117255284.1496997865; NTES_CMT_USER_INFO=114791670%7C%E6%9C%89%E6%80%81%E5%BA%A6%E7%BD%91%E5%8F%8B06RVjS%7Chttps%3A%2F%2Fsimg.ws.126.net%2Fe%2Fimg5.cache.netease.com%2Ftie%2Fimages%2Fyun%2Fphoto_default_62.png.39x39.100.jpg%7Cfalse%7CbTE1NTUxNzExNjIxQDE2My5jb20%3D; P_INFO=m15551711621@163.com|1496998207|1|gentie|00&99|anh&1496997659&gentie#anh&341400#10#0#0|155621&1|gentie|15551711621@163.com; JSESSIONID-WYYY=RTSfRwaST5tauvXs0izfThqmwpJpAnwXWkVRYvTMmUvkGcjaYACIsticGqttw49IebS3rylkQkQMYU80bG%5CKsuRwkyKqwSv1q3awPWl2kfYMhhe80TgzHgoD6bETukKPTBGSXU6%5CCNNBgqMkDH%2B%2BJn5Xq%2F%2BM9gkVAoka65zKuskVe3yb%3A1500273597926; _iuqxldmzr_=32; MUSIC_U=1c33d6962b68f6dd5af08882146e57a25053be85f4706fa6189462dbd4b522a1beb9fcd84ca3491a158141e821750e935948222dec0e389baf9e62a8590fd08a; __remember_me=true; __csrf=434dd23604f38b4cf6104c749cd76916; __utma=94650624.2094316220.1493689207.1500102460.1500271801.52; __utmb=94650624.2.10.1500271801; __utmc=94650624; __utmz=94650624.1494379976.7.4.utmcsr=baidu|utmccn=(organic)|utmcmd=organic";
var headers = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate",
    // "Accept-Language": "zh-CN,zh;q=0.8"
    // "Content-Type": "application/x-www-form-urlencoded",
    // "Cookie": cookie
}
app.get('/', function(req, res){
    res.header("Access-Control-Allow-Origin", "*")
    // res.setDefaultEncoding('binary')
    var options = {
        url: 'https://octodex.github.com/',
        header: headers
    }
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        $ = cheerio.load(body);//当前的$,它是拿到了整个body的前端选择器
        var img = $('.masonry-brick')
        console.log($(body));
        /**
         * @array svg出入图片路径的数组
         */ 
        var svg = []
        for (let i = 0; i < img.length; i++) {
            if (img[i] !== undefined) {
                svg.push(img[i].children)
            }
        }
        console.log(svg)
        // var downloadPic = function(src, dest){
        //     request(src).pipe(fs.createWriteStream(dest)).on('close',function(){
        //         console.log('pic saved!')
        //     })
        // }
        // downloadPic(svg[3],'../images/1.jpg')
        // for (let i = 0; i < svg.length; i++) {
        //     console.log(svg[i].substring(0,5))
        //     if (svg[i] === '' || String(svg[i].substring(0,4)) === 'data') {
        //         console.log(String(svg[i].substring(0,4)))
        //         return false
        //     } else {
        //         downloadPic(svg[i],'../images/' + i + '.jpg')
        //     }
            // console.log(svg[i])
        //     downloadPic(svg[i],'../images/' + i + '.jpg')
        // }
        // // console.log(svg)
        svg = JSON.stringify(svg)
        res.format({
                    'application/json': function(){
                        res.send({ message: svg });
                    },
                })
         //我博客的获取用户名
      }else{
         console.log("思密达，没爬取到用户名，再来一次");
      }
})
});
var server = app.listen(3000, function(){
                var host = server.address().address
                var port = server.address().port
                console.log(server.address())
                console.log("server listening at http://%s:%s", host, port)
            });
