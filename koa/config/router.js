const Router = require('koa-router')
const router = new Router()
const user = require('../controller/user')
const products = require('../controller/product')

router.get('/user/login', user.login)
router.get('/user/profile/:name', user.profile)
router.post('/signin', user.signin)
router.get('/product/brand', products.brand)
router.get('/product/category', products.category)

module.exports = router