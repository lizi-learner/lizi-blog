const resInfo = require('../constants/response-info');

const errorHandler = (error, ctx) => {
  //获取响应信息
  const res = resInfo[error.message];

  if(!res){
    //没有定义的错误
    ctx.status = 500;
    ctx.body = error.message;
    return
  }
 
  ctx.status = res.code;
  ctx.body = res.msg;
}

module.exports = errorHandler;