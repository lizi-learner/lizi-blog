//分类管理模块路由
const Router = require('koa-router');

//导入各路由处理方法
const { list, info, add, update, remove } = require('../controller/cate.controller');
const { checkParams, queryCate } = require('../middleware/cate')

//导入解析x-www-form-urlencoded数据的库
const multer = require('koa-multer');
const upload = multer({})

// 创建路由对象
const cateRouter = new Router({ prefix: '/cate' })


// 添加路由
cateRouter.get('/', checkParams, queryCate, list);
cateRouter.get('/:id', info);
cateRouter.post('/', add);
cateRouter.put('/', upload.any(), update);
cateRouter.delete('/', upload.any(), remove);


module.exports = cateRouter;