//cate路由的处理函数
class CateController {
  //分类列表路由
  async list(ctx, next){
    console.log('你好，我是List')
    ctx.body = '你好，我是List';
  }
  //单条分类路由
  async info(ctx, next){

  }

  //添加分类
  async add(ctx, next){

  }

  //修改分类
  async update(ctx, next){

  }

  //删除分类
  async remove(ctx, next){

  }

}

module.exports = new CateController();