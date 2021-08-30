//管理员管理模块
const Router = require('koa-router');
const { list, info, add, update, remove } = require('../controller/admin.controller')

const adminRouter = new Router({prefix: '/admin'});

adminRouter.get('/', list);
adminRouter.get('/:id', info);
adminRouter.post('/', add);
adminRouter.put('/', update);
adminRouter.delete('/', remove);

module.exports = adminRouter;