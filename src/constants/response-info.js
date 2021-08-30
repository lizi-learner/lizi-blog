const errorHandler = require('../app/error-handler')
const errorTypes = require('../constants/error-types')

//定义一个对象
const obj = {
  //默认请求失败
  [errorTypes.DEFAULT_ERROR]: {
    code: 500,
    msg: "服务器错误"
  },
  // 定义错误返回 - 缺少必要参数
  [errorTypes.LACK]: {
    code: 400,
    msg: "缺少必要参数"
  },
  // 定义错误返回 - 登录名或密码错误
  [errorTypes.LOGIN_ERROR]: {
    code: 400,
    msg: "用户名或密码错误"
  },
  [errorTypes.TOKEN_ERROR]: {
    code: 400,
    msg: "Token验证失败"
  }
}

module.exports = obj