const common = require('../utils/common');
const errorTypes = require('../constants/error-types')
const service = require('../service/article.service')
const dataFormat = require('dateformat')

//处理文章管理模块路由
class ArticleController {
    //获得文章列表
    async list(ctx, next){
      //检验参数
      const query = ctx.request.query;
      if(!common.checkParams(query, ['page', 'rows'])){
        const error = new Error(errorTypes.LACK);
        return ctx.app.emit('error', error, ctx);
      }

      //根据参数查询
      let result, count;
      try {
        result = await service.queryArticleList(query);
        count = await service.queryCount();
      } catch(e){
        const error= new Error(e.sqlMessage);
        return ctx.app.emit('error', error, ctx);
      }
      const list = [];
      result.forEach((v, i) => {
        let obj = {
          id: v.id,
          title: v.title,
          desc: v.desc.substr(0, 20) + '...',
          cate: v.cate,
          cateName: v.name,
          content: v.content,
          createdAt: dataFormat(v.createAt, 'yyyy-mm-dd HH:MM:ss')
        }
        list.push(obj);
      })

      ctx.body = {
        code: 200,
        msg: "查询文章列表成功",
        data: {
          list: list,
          count: count
        }
      }
    }
    //获得单条分文章
    async info(ctx, next){
      //获得
      const id = ctx.request.params.id;

      let result = await service.queryArticle(id);
      
      if(result.length !== 1){
        const error = new Error(errorTypes.DEFAULT_ERROR);
        return ctx.app.emit('error', error, ctx);
      }
      result = result[0];
      ctx.body = {
        code: 200,
        msg: "获取分类数据成功",
        data: {
          id: result.id,
          title: result.title,
          desc: result.desc.substr(0, 20) + '...',
          cate: result.cate,
          cateName: result.name,
          content: result.content,
          createdAt: dataFormat(result.createAt, 'yyyy-mm-dd HH:MM:ss')
        }
      }
    }
  
    //添加文章
    async add(ctx, next){
      let formData = ctx.request.body;

      try {
        await service.addArticle(formData);
      } catch(e){
        const error= new Error(e.sqlMessage);
        return ctx.app.emit('error', error, ctx);
      }

      ctx.body = {
        code: 200,
        msg: "成功添加"
      }
    }
  
    //修改文章
    async update(ctx, next){
      let formData = ctx.request.body;

      try {
        await service.updateArticle(formData);
      } catch(e){
        const error= new Error(e.sqlMessage);
        return ctx.app.emit('error', error, ctx);
      }
      ctx.body = {
        code: 200,
        msg: "成功修改"
      }
    }
  
    //删除文章
    async remove(ctx, next){
      let id = ctx.request.body.id;
    
      try {
        await service.removeArticle(+id);
      } catch(e){
        const error= new Error(e.sqlMessage);
        return ctx.app.emit('error', error, ctx);
      }
      ctx.body = {
        code: 200,
        msg: "成功删除"
      }
    }
  
}

module.exports = new ArticleController();