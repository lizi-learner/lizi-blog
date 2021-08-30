# 项目配置

## 配置项目

- 初始化项目

  ```
  npm init -y
  ```

- 配置项目入口

  ```
  //package.json
  “main": "main.js"
  ```

- 配置启动命令

  ```
  //package.json
  “scripts": {
  	"start": "nodemon ./src/main.js"
  }
  ```

## 启动服务

- 创建app文件夹，保存app的设置和路由使用等

- 在环境变量文件设置端口号

  注意.env文件在整个项目目录下

  ```
  .env
  APP_PORT=3004
  ```

- 将环境变量导出方便使用

  ```js
  //src/app/config.js
  const dotenv = require('dotenv');
  
  dotenv.config();
  
  module.exports = {
    APP_PORT
  } = process.env
  ```

- 监听端口3004

## 设置路由

- 创建router文件夹，保存各功能的路由
- 创建controller文件夹，保存各路由接口的功能

- 在router文件夹中创建index.js，批量导入文件下所有的路由模块

  ```js
  const { readdir } = require('fs/promises');
  
  const useRoutes = function(){
    readdir(__dirname).then(files => {
      files.forEach(file => {
        if(file === 'index.js') return;
        const router = require(`./${file}`);
        this.use(router.routes());
        this.use(router.allowedMethods());
      })
    })
  
  }
  
  module.exports = useRoutes;
  ```

## 接口开发

### 准备步骤

- 新增环境变量(.env)

- 连接数据库

  - 导入mysql2 (src/app/database.js)

  - 创建连接池 (src/app/database.js)

  - 使用预编译的sql语句 (src/service)

    ```js
    //例，查询用户和密码是否正确
    async queryAdmin(obj){
        //设置查询的sql语句
        const statement = `SELECT * FROM admin WHERE username = ? && password = ?;`;
        //执行语句
        const result = await connection.execute(statement, [obj.username, obj.password])
        //返回结果的第一条，如果有查询结果，第一条是一个长度不为0的数组
        return result[0];
    }
    ```


### 登录接口

- 使用中间件依次处理

  ```js
  authRouter.post('/login', verifyUser, login, writeLastLoginAt)
  ```

- verifyUser
  - 检验参数有没有缺少

    ```js
    //./src/middleware/auth.js
    if(!common.checkParams(ctx.request.body, ['username', 'password'])){
        console.log(ctx.request.body)	//使用koa-bodyparse库解析body里的JSON
        const error = new Error(errorTypes.LACK);	
        return ctx.app.emit('error', error, ctx);	//发射错误，将错误信息传到最后一层
    }
    ```
  
  - 检验用户和密码正确与否
  
    ```js
    //去数据库查询是否存在该用户
    const result = await service.queryAdmin(ctx.request.body);
    if(!result.length){
        //没有相应结果
        const error = new Error(errorTypes.LOGIN_ERROR);
        return ctx.app.emit('error', error, ctx);
    }
    //将查询到的用户信息保存
    ctx.adminData = result[0]
    ```
  
- login(添加token)

  - 导入jwt库
  - 将用户id保存在token内
  - 返回结果

- writeLastLoginAt
  - 向数据库添加上次登录时间

