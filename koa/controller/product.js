var { getData } = require('../model/db')

module.exports = {
  async brand (ctx, next) {
    var sqlstring = 'select * from product_brand_info';
    let data = await getData(sqlstring)
    var resv = {
          code: 0,
          data: data
        }
    ctx.body = resv
  },
  async category (ctx, next) {
    var sqlstring = 'select * from product_category';
    let data = await getData(sqlstring)
    var resv = {
          code: 0,
          data: data
        }
    ctx.body = resv
  }
}