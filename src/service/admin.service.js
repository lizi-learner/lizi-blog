//对数据表admin的操作
const connection = require('../app/database');

class AdminService {
  
  async queryAdmin(obj){
    //设置查询的sql语句
    const statement = `SELECT * FROM admin WHERE username = ? && password = ?;`;
    //执行语句
    const result = await connection.execute(statement, [obj.username, obj.password])
    //返回结果的第一条，如果有查询结果，第一条是一个长度不为0的数组
    return result[0];
  }

  async updateLoginTime(id){
    const statement =  `UPDATE admin SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?;`
    const result = await connection.execute(statement, [id]);
    return result;
  }
}

module.exports = new AdminService()