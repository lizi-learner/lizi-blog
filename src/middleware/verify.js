const Token = require('../app/token');  //引入token处理的controller
const errorTypes = require('../constants/error-types');

async function verifyToken(ctx, next){
  // 如果请求路径是登录页则跳过
  if(ctx.path !== '/login') {

    let token = ctx.request.header.authorization;
    
    if(!token) {
      const error = new Error(errorTypes.TOKEN_ERROR);
      return ctx.app.emit('error', error, ctx);
    }

    let tokenVerifyObj = Token.decrypt(token.replace('Bearer ', ''));
    if(!tokenVerifyObj.token){
      const error = new Error(errorTypes.TOKEN_ERROR);
      return ctx.app.emit('error', error, ctx);
    }
  };

  await next();
}

module.exports = verifyToken;