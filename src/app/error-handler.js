const resInfo = require('../constants/response-info');

const errorHandler = (error, ctx) => {
  //获取响应信息
  const res = resInfo[error.message];

  ctx.status = res.code;
  ctx.body = res.msg;
}

module.exports = errorHandler;