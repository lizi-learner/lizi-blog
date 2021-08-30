//对数据表cate的操作
const connection = require('../app/database');

class CateService {
  async queryCateDroplist(){
    const statement = `SELECT * FROM cate`;
    const result = await connection.execute(statement);
    return result[0];
  }

  async queryCate(query){
    //根据前端提交的参数计算SQL语句中需要的offset,即从多少条开始查询
    let offset = (query.page - 1) * query.rows || 0 + '';
    //计算需要查询多少条
    let limit = +query.rows || 20 + '';
    const statement = `SELECT * FROM cate WHERE name = ? || ? LIMIT ?, ?;`;
    // let condition = query.name ? query.name : '1 || 1';
    // console.log(condition)
    let condition = query.name ? [query.name, 0] : [1, 1];
    const result = await connection.execute(statement, [...condition, offset, (offset + limit)])

    return result[0];
  }

  async addCate(name){
    //这里将表的字段name改成了unique因此重复添加是无效的，并且不会报错
    //如果name不是字符串会调用toString(),也不会报错
    const statement = 'INSERT INTO cate (name) VALUES (?)';
    await connection.execute(statement, [name]);
  }

  async update(obj){
    const statement = `UPDATE cate SET name = ? WHERE id = ?`;
    await connection.execute(statement, [obj.name, obj.id]);
  }

  async remove(id){
    const statement = `DELETE FROM cate WHERE id = ?`;
    await connection.execute(statement, [id]);
  }
}

module.exports = new CateService();