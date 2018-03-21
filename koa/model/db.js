var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mc_productdb'
})

connection.connect()

let getData = function(sqlstring) {
  return new Promise((resolve, reject) => {
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

module.exports = { getData }