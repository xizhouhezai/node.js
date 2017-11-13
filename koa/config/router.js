const Router = require('koa-router')
const router = new Router()
const user = require('../controller/user')

router.get('/user/login', user.login)
router.get('/user/profile/:name', user.profile)
router.post('/signin', user.signin)

module.exports = router