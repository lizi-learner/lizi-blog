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

  async queryAdminList(query){
    let {page, rows} = query;
    let offset = (page - 1) * rows;
    let limit = rows;

    const count = await this.queryCount();
    
    const statement = `SELECT * FROM admin WHERE username = ? || ? LIMIT ?,?;`;
    let condition = query.username ? [query.username, 0] : [1, 1];
    
    const result = await connection.execute(statement, [...condition, offset + '', limit + '']);
    return [result[0], count]
  }

  async queryCount(){
    const statement = `SELECT COUNT(*) FROM admin`;
    const result = await connection.execute(statement);
   
    return result[0][0]['COUNT(*)']
  }

  async queryAdminbyId(id){
    const statement = 'SELECT * FROM admin WHERE id = ?;'
    const result = await connection.execute(statement, [+id]);
    return result[0];
  }

  async addAdmin(data){
    const { username, password, name, role } = data;
    const statement = 'INSERT INTO admin (username, password, name, role) VALUES (?,?,?,?);';
    await connection.execute(statement, [username, password, name, role])
  }

  async updateAdmin(data){
    const { id, username, password, name, role } = data;
    const statement = 'UPDATE admin SET username=?, password=?, name=?, role=? WHERE id=?;';
    await connection.execute(statement, [username, password, name, role, +id])
  }

  async removeAdmin(id){
    const statement = 'DELETE FROM admin WHERE id = ?;';
    await connection.execute(statement, [id]);
  }
}

module.exports = new AdminService()