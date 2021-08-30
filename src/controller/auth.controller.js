const dataFormat = require('dateformat')

const errorTypes = require('../constants/error-types');
const tokenHandler = require('../app/token');
const service = require('../service/admin.service')

class AuthController {
  async login(ctx, next){
    console.log("2添加token");
    //取出用户id添加到token中
    const adminId = ctx.adminData.id
    const data = ctx.adminData

    const adminInfo = {
      id: adminId
    };
    //生成token,过期时间设置为6分钟
    let token = tokenHandler.encrypt(adminInfo, 3600)
    ctx.adminData.token = token

    //将token添加到响应中
    ctx.body = {
      status: 200,
      message: '登录成功',
      data: {
        id: adminId,
        username: data.username,
        name: data.name,
        role: data.role,
        LastLoginAt: dataFormat(data.LastLoginAt, 'yyyy-mm-dd HH:MM:ss'), //数据库里返回的时间是date类型
        createdAt: dataFormat(data.createAt, 'yyyy-mm-dd HH:MM:ss'), 
        token,
      }
    }

    console.log("3登录成功")
    console.log("4写入上次登录信息")
    await next();
  }

  async writeLastLoginAt(ctx, next){
    //把这次登录时间记录在数据表中
    //更新数据库
    try{
      await service.updateLoginTime(ctx.body.data.id)
    } catch {
      const error = new Error(errorTypes.DEFAULT_ERROR);
      ctx.app.emit('error', error, ctx);
      console.log("4写入登录信息失败");
    }
  }
}

module.exports = new AuthController()