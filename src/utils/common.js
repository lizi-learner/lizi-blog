const async = require('async')
const constant = require('../constants/response-info')
/**
 * 克隆方法，克隆一个对象
 * @param {*} obj 
 */
function clone(obj){
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 校验参数全局方法
 * @param {请求的参数集} params 
 * @param {需要验证的参数} checkArr 
 * @param {回调} cb 
 */
function checkParams(params, checkArr, cb){
  //验证参数有没有缺少，如果缺少则返回错误信息
  let flag = true;
  checkArr.forEach(v => {
    if(!params[v]){
      flag = false;
    }
  });
  if(flag){
    cb(null);
  }else{
    cb(constant.LACK)
  }
}

/**
 * 返回统一方法，返回JSON格式数据(没懂)
 * @param tasks  当前controller执行tasks
 * @param res    当前controller responese
 * @param resObj 当前controller返回json对象
 */
 function autoFn (tasks, res, resObj) {
  async.auto(tasks, function (err){
    if (!!err) {
      console.log (JSON.stringify(err));
      res.json({
        code: err.code || Constant.DEFAULT_ERROR.code,
        msg: err.msg || JSON.stringify(err)
      });
    } else {
      res.json(resObj);
    }
  });
}

module.exports = {
  clone,
  checkParams,
  autoFn
}