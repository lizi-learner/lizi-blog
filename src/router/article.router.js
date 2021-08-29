const Router = require('koa-router');

const { list, info, add, update, remove }  = require('../controller/article.controller')

const articleRouter = new Router();

articleRouter.get('/', list);
articleRouter.get('/:id', info);
articleRouter.post('/', add);
articleRouter.put('/', update);
articleRouter.delete('/', remove);

module.exports = articleRouter