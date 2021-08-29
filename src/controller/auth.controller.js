const constant = require('../constants/response-info');


class AuthController {
  async login(ctx, next){
    ctx.body = "登录成功"
    // 定义一个返回对象
    // const resObj = common.clone(constant.DEFAULT_SUCCESS);

    //校验参数

    //查询用户(用户名 + 密码)

    //创建token

    //写入上次登录信息


  }
}

module.exports = new AuthController()