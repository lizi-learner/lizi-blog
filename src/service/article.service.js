const connection = require('../app/database');

class ArticleService {
  async queryArticleList(query){
    let { page, rows, title } = query;
    let offset = (page - 1) * rows;
    let limit = rows;

    let condition = title ? [title, 0] : [1, 1];
    //注意这里是联合查询left join
    const statement = `SELECT article.id, article.title, article.desc, article.content, article.cate, article.createAt, cate.name FROM article LEFT JOIN cate ON article.cate = cate.id  WHERE title = ? || ? LIMIT ?,?;`;
    const result = await connection.execute(statement, [...condition, offset + '', limit + '']);
    return result[0];
  }

  async queryArticle(id){
    const statement = `SELECT article.id, article.title, article.desc, article.content, article.cate, article.createAt, cate.name FROM article LEFT JOIN cate ON article.cate = cate.id  WHERE article.id = ?;`;
    const result = await connection.execute(statement, [id]);

    return result[0];
  }

  async queryCount(){
    const statement = `SELECT COUNT(*) FROM article`;
    const result = await connection.execute(statement);
   
    return result[0][0]['COUNT(*)']
  }

  async addArticle(data){
    const statement =  'INSERT INTO article (title, `desc`, content, cate) VALUES (?, ?, ?, ?);';
    await connection.execute(statement, [data.title, data.desc, data.content, data.cate]);
  }

  async updateArticle(data){
    console.log(data)
    const statement =  'UPDATE article SET title=?, `desc`=?, content=?, cate=? WHERE id=?;';
    await connection.execute(statement, [data.title, data.desc, data.content, data.cate, data.id]);
  }

  async removeArticle(id){
    const statement = `DELETE FROM article WHERE id = ?`;
    await connection.execute(statement, [id]);
  }
}

module.exports = new ArticleService();