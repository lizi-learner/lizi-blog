class AdminController {
    //得到管理员列表
    async list(ctx, next){
      console.log('你好，我是List')
      ctx.body = '你好，我是List';
    }
    //得到管理员信息
    async info(ctx, next){
  
    }
  
    //添加管理员
    async add(ctx, next){
  
    }
  
    //修改管理员
    async update(ctx, next){
  
    }
  
    //删除管理员
    async remove(ctx, next){
  
    }
  
}

module.exports = new AdminController()