const connection = require('../app/database');

class InfoService {
  async queryInfo(){
    const statement = 'SELECT * FROM info;';
    const result = await connection.execute(statement);

    return result[0][0]
  }

  async updateInfo(data){
    const { title, subtitle, about } = data;
    const res = await connection.execute('SELECT * FROM info;');
   
    if(res[0].length){
      const statement = 'UPDATE info SET title=?, subtitle=?, about=?;';
      await connection.execute(statement, [title, subtitle, about]);
    }else {
      this.addInfo(data)
    }

  }

  async addInfo(data){
    const { title, subtitle, about } = data;
    const statement = 'INSERT INTO info (title, subtitle, about) VALUES (?, ?, ?)';
    await connection.execute(statement, [title, subtitle, about]);
  }
}

module.exports = new InfoService();