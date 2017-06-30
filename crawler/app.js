var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');


var cookie = "_ntes_nnid=45eeaf8544f154fe393bf3c814879da2,1493689207006; _ntes_nuid=45eeaf8544f154fe393bf3c814879da2; _ga=GA1.2.2117255284.1496997865; NTES_CMT_USER_INFO=114791670%7C%E6%9C%89%E6%80%81%E5%BA%A6%E7%BD%91%E5%8F%8B06RVjS%7Chttps%3A%2F%2Fsimg.ws.126.net%2Fe%2Fimg5.cache.netease.com%2Ftie%2Fimages%2Fyun%2Fphoto_default_62.png.39x39.100.jpg%7Cfalse%7CbTE1NTUxNzExNjIxQDE2My5jb20%3D; P_INFO=m15551711621@163.com|1496998207|1|gentie|00&99|anh&1496997659&gentie#anh&341400#10#0#0|155621&1|gentie|15551711621@163.com; JSESSIONID-WYYY=hZPB3cb3VtHABfeNan%2Bjygx%2FIRCPHsD35aDy9wfXWtQcbJltrUoEboalb0bMwEqCJcm0AYktaf9%2FzfVwniTA%2FohBG5TRXRNvmrPwRmFuCg%2B6FAS7mfWXPyoz2gvWCHCM%2F95c4jvz%5CU7Jahw5mmm5FVD6lAPvYHxxNubYzJV5PjBU2w4F%3A1498812524594; _iuqxldmzr_=32; playerid=28702372; MUSIC_U=1c33d6962b68f6dd5af08882146e57a25053be85f4706fa63a8fa72b2e20b36326ee8475179dc2b653228770eb2b671e70f13d7073c72eb8af9e62a8590fd08a; __remember_me=true; __csrf=f1f43a50884e277c22ba3b4fd5be1039; __utma=94650624.2094316220.1493689207.1498807245.1498809540.42; __utmb=94650624.9.10.1498809540; __utmc=94650624; __utmz=94650624.1494379976.7.4.utmcsr=baidu|utmccn=(organic)|utmcmd=organic";
var headers = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "zh-CN,zh;q=0.8",
    "Cookie": cookie
}
app.get('/', function(req, res){
    res.header("Access-Control-Allow-Origin", "*")

    var options = {
        url: 'http://music.163.com',
        header: headers
    }
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        $ = cheerio.load(body);//当前的$,它是拿到了整个body的前端选择器
        // var img = $('.home').find('img')
        var svg = []
        // for(let key in img) {
        //     // console.log(img[key].attribs)
        //     if (img[key].attribs !== undefined) {
        //        if (img[key].attribs.src !== undefined) {
        //            svg.push(img[key].attribs)
        //        }
        //     }
        // }
        svg = JSON.stringify(body)
        res.format({
                    'application/json': function(){
                        res.send({ message: svg });
                    },
                })
    //   console.log(response); //我博客的获取用户名
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
