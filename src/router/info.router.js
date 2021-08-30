//博客信息管理
const Router = require('koa-router');

const { info, update } = require('../controller/info.controller')

const infoRouter = new Router({prefix: '/info'});

infoRouter.get('/', info);
infoRouter.put('/', update);

module.exports = infoRouter;