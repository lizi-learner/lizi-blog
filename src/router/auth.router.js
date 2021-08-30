//登录验证模块路由
const Router = require('koa-router');

const { login, writeLastLoginAt } = require('../controller/auth.controller')

//导入中间件
const { verifyUser, addToken } = require('../middleware/auth')

const authRouter = Router();

authRouter.post('/login', verifyUser, login, writeLastLoginAt)

module.exports = authRouter;