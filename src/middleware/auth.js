const common = require('../utils/common');
const errorTypes = require('../constants/error-types');
const service = require('../service/admin.service')

//验证登录是否成功
const verifyUser = async (ctx, next) => {

  console.log("1验证登录信息")
  //校验用户名和密码是否为空
  
  if(!common.checkParams(ctx.request.body, ['username', 'password'])){
    console.log(ctx.request.body)
    const error = new Error(errorTypes.LACK);
    return ctx.app.emit('error', error, ctx);
  }

  //去数据库查询是否存在该用户
  const result = await service.queryAdmin(ctx.request.body);
  if(!result.length){
    //没有相应结果
    const error = new Error(errorTypes.LOGIN_ERROR);
    return ctx.app.emit('error', error, ctx);
  }
  //将查询到的用户信息保存，以供生成token
  // ctx.req.id = result[0].id
  ctx.adminData = result[0]

  await next();
}

module.exports = {
  verifyUser
}