const Koa = require('koa');

//解析body的json数据
const bodyParser = require('koa-bodyparser')

const useRoutes = require('../router')

const errorHandler = require('./error-handler')

const app = new Koa();

//批量注册路由
app.useRoutes = useRoutes;

app.use(bodyParser());
app.useRoutes();

//处理中间件的错误
app.on('error', errorHandler)

module.exports = app