var Router = require('koa-router');
var router = new Router();
var index = require('../controllers/index');

router.get('/api/1/u/signup', index.signup);
router.get('/api/1/u/verify', index.verify);
router.get('/api/1/u/update', index.update);

module.exports = router;