const Router = require('koa-router')
const router = new Router()
const user = require('../controller/user')
const products = require('../controller/product')

router.get('/user/login', user.login)
router.get('/user/profile/:name', user.profile)
router.post('/signin', user.signin)
router.get('/product', products.product)

module.exports = router