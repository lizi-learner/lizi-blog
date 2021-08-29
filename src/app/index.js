const Koa = require('koa');

const useRoutes = require('../router')

const app = new Koa();

//批量注册路由
app.useRoutes = useRoutes;
app.useRoutes();

module.exports = app