const jwt = require('jsonwebtoken');  //导入jwt包
const tokenKey = "UT9zo#W7!@50ETnk";  //设置一个密钥，用来加密和解析Token

//定义一个对象
class Token {
  //加密方法
  /**
   * @param data 需要加密的数据
   * @param time token的过期时间
   * @returns 返回一个token
   */
  encrypt(data, time){
    return jwt.sign(data, tokenKey, {expiresIn: time})
  }

  //解密方法
  /**
   * @param token 加密后的token
   * @returns 返回对象
   * {{token: boolean(true表示Token合法，false则不合法)}}
   * data: 解密出来的数据或错误信息
   */
  decrypt(token){
    try{
      let data = jwt.verify(token, tokenKey);
      return {
        token: true,
        data: data
      }
    } catch(e){
      return {
        token: false,
        data: e
      }
    }
  }
}

module.exports = new Token();