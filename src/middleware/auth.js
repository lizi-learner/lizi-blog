const common = require('../utils/common');

const verifyUser = async (ctx, next) => {
  await next();
}

module.exports = {
  verifyUser
}