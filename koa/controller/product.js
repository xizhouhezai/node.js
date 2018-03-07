var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mc_productdb'
})

connection.connect()

let data = function() {
  return new Promise((resolve, reject) => {
    var sqlstring = '';
    sqlstring = 'select * from product_brand_info';
    connection.query(sqlstring, (err, result) => {
      if (err) {
        reject(err)
        return;
      }
      resolve(result)
    })
    connection.end();
  })
}

module.exports = {
  async product(ctx, next) {
    let goods = await data()
    var resv = {
          code: 0,
          data: goods
        }
    ctx.body = resv
  }
}