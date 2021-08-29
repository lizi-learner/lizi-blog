//分类管理模块路由
const Router = require('koa-router');

//导入各路由处理方法
const { list, info, add, update, remove } = require('../controller/cate.controller');

// 创建路由对象
const cateRouter = new Router();

// 添加路由
cateRouter.get('/', list);
cateRouter.get('/:id', info);
cateRouter.post('/', add);
cateRouter.put('/', update);
cateRouter.delete('/', remove);

module.exports = cateRouter;