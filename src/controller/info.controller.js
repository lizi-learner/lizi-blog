const service = require('../service/info.service');
const dataFormat = require('dateformat')

class InfoController {
  //获取博客信息
  async info(ctx, next){
    //在数据库直接查询id为1的数据
    const result = await service.queryInfo();
    
    if(result.length == 0){
      ctx.body = {
        code: 204,
        msg: "查询内容为空"
      }
    } else {
      ctx.body = {
        code: 200,
        msg: "查询博客信息成功",
        data: {
          id: result.id,
          title: result.title,
          subtitle: result.subtitle,
          about: result.about,
          createdAt: dataFormat(result.createAt, 'yyyy-mm-dd HH:MM:ss')
        }
      }
    }
  }
  //修改博客信息
  async update(ctx, next){
    //获取参数
    const formData = ctx.request.body;
    
    //修改博客信息
    try {
      await service.updateInfo(formData);
    } catch (e){
      const error = new Error(e.sqlmessage);
      return app.emit('error', error, ctx)
    }
    

    ctx.body = {
      code: 200,
      msg: '修改成功'
    }
  }
}

module.exports = new InfoController()