var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
app.get('/', function(req, res){
    request('http://huaban.com', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        $ = cheerio.load(body);//当前的$,它是拿到了整个body的前端选择器
        res.format({
            'application/json': function(){
                res.send({ message: body });
            },
        })
    //   console.log(response); //我博客的获取用户名
      }else{
         console.log("思密达，没爬取到用户名，再来一次");
      }
})
});
app.listen(3000);
// { [Function: initialize]
//   fn:
//    initialize {
//      constructor: [Circular],
//      _originalRoot:
//       { type: 'root',
//         name: 'root',
//         namespace: 'http://www.w3.org/1999/xhtml',
//         attribs: {},
//         'x-attribsNamespace': {},
//         'x-attribsPrefix': {},
//         children: [Array],
//         parent: null,
//         prev: null,
//         next: null } },
//   load: [Function],
//   html: [Function],
//   xml: [Function],
//   text: [Function],
//   parseHTML: [Function],
//   root: [Function],
//   contains: [Function],
//   merge: [Function],
//   _root:
//    { type: 'root',
//      name: 'root',
//      namespace: 'http://www.w3.org/1999/xhtml',
//      attribs: {},
//      'x-attribsNamespace': {},
//      'x-attribsPrefix': {},
//      children: [ [Object], [Object] ],
//      parent: null,
//      prev: null,
//      next: null },
//   _options:
//    { withDomLvl1: true,
//      normalizeWhitespace: false,
//      xmlMode: false,
//      decodeEntities: true } }