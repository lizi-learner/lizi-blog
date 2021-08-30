const common = require('../utils/common');
const errorTypes = require('../constants/error-types');
const service = require('../service/cate.service');

const checkParams = async function(ctx, next){
  console.log("1 验证参数是否合理");
  //ctx.request.query能够获取到参数
  const query = ctx.request.query;
  //如果传入了droplist参数，代表需要下拉列表(前端展示)，跳过分页逻辑(后台系统)
  if(!query.dropList){
    //调用公共的校验参数方法
    if(!common.checkParams(query, ['page', 'rows'])){
      //报错
      const error = new Error(errorTypes.LACK);
      return ctx.app.emit('error', error, ctx);
    }
  }

  await next();
}

const queryCate = async function(ctx, next){
  console.log("2 根据query查询分类信息");

  const query = ctx.request.query;
  let result = null;
  //因为用户传的数据page和row可能不合法，查询数据库会报错，需要捕获错误
  try {
    if(query.dropList){
      //直接查询整张表
      result = await service.queryCateDroplist();
    } else{
      //分页查询
      result = await service.queryCate(query);
    }
  } catch(e){
    const error = new Error(errorTypes.DEFAULT_ERROR);
    console.log('3 数据库错误')
    return ctx.app.emit('error', error, ctx);
  }

  ctx.cateData = result;
  await next();
}

module.exports = {
  checkParams,
  queryCate
}