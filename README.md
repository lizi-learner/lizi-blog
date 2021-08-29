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

### 登录接口
