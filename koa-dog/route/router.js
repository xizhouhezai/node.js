var Router = require('koa-router');
var router = new Router({
    prefix: '/api/1'
});
var index = require('../controllers/index');

router.post('/u/signup', index.signup);
router.post('/u/verify', index.verify);
router.post('/u/update', index.update);

module.exports = router;