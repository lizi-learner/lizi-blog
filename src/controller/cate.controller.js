const dataFormat = require('dateformat')
const service = require('../service/cate.service');
const errorTypes = require('../constants/error-types');
const common = require('../utils/common');

//cate路由的处理函数
class CateController {
  //分类列表路由
  //该接口有四个请求参数：page: 页码  rows每页条数  name分类名称  dropList是否为下拉列表
  async list(ctx, next){
    console.log('3 成功返回数据');
    //处理结果
    const result = ctx.cateData;
  
    const list = [];
    result.forEach(v => {
      let obj = {
        id: v.id,
        name: v.name,
        createdAt: dataFormat(v.createAt, 'yyyy-mm-dd HH:MM:ss')
      };
      list.push(obj);
    })
   
    ctx.body = {
      code: 200,
      msg: "获取分类数据成功",
      data: {
        list, 
        count: ctx.count,
      }
    };
  }

  //单条分类路由数据
  async info(ctx, next){
    //获取id
    const name = ctx.request.params.id;
    //查询数据
    //这个数据不能出现重复的情况，也就是不能出现重复分类，要在添加分类的时候加以限制
    //这个不会出现找不到的情况，因为前端是根据返回的数据显示的，点击的时候会发出请求，找不到（服务器 删除了而前端没有刷新）报服务器错误
    const result = await service.queryCate({name});
    if(result.length !== 1){
      const error = new Error(errorTypes.DEFAULT_ERROR);
      return ctx.app.emit('error', error, ctx);
    }

    ctx.body = {
      code: 200,
      msg: "获取分类数据成功",
      data: {
        id: result[0].id,
        name,
        createdAt: dataFormat(result[0].createAt, 'yyyy-mm-dd HH:MM:ss')
      }
    };
  }

  //添加分类
  async add(ctx, next){
    const name = ctx.request.body.name;

    if(!name){
      const error = new Error(errorTypes.LACK);
      return ctx.app.emit('error', error, ctx);
    }
    //添加数据
    try {
      await service.addCate(name);
    } catch(e){
      const error= new Error(e.sqlMessage);
      return ctx.app.emit('error', error, ctx);
    }
    
    ctx.body = {
      code: 200,
      msg: `添加分类 ${name} 成功`
    };
  }

  //修改分类
  async update(ctx, next){
    const formData = ctx.request.body;
    
    //验证数据是否有缺失
    if(!common.checkParams(formData, ['id', 'name'])){
      const error = new Error(errorTypes.LACK);
      return ctx.app.emit('error', error, ctx);
    }

    //修改数据
    //这里如果id不存在的话不会变化
    //如果改成已有的分类会报错
    try {
      await service.update(formData);
    } catch(e){
      const error= new Error(e.sqlMessage);
      return ctx.app.emit('error', error, ctx);
    }

    ctx.body = {
      code: 200,
      msg: '修改成功'
    }
  }

  //删除分类
  async remove(ctx, next){
    //验证数据缺失
    const id = ctx.request.body.id
    if(!id){
      const error = new Error(errorTypes.LACK);
      return ctx.app.emit('error', error, ctx);
    }

    try{
      await service.remove(+id);
    } catch(e){
      const error= new Error(e.sqlMessage);
      return ctx.app.emit('error', error, ctx);
    }

    ctx.body = {
      code: 200,
      msg: '删除成功'
    }
  }

}

module.exports = new CateController();