var http = require('http')
var cheerio = require('cheerio')

http.get('http://www.runoob.com/mongodb/mongodb-dropdatabase.html', (res) => {
  const { statusCode } = res;
  // console.log(res)
  let error;
  if (statusCode !== 200) {
    error = new Error('请求失败。\n' +
                      `状态码: ${statusCode}`);
  }

  res.setEncoding('utf8');
  let newData = '';

  res.on('data', (chunk) => {
    newData += chunk
  })
  res.on('end', () => {
    console.log('抓取网页结束')
    if (error) {
      console.log('抓取网页失败')
      console.error(error.message)
    }
  })
  console.log(newData)
})