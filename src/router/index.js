//批量导入路由
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