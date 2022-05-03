const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация!!!');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // Возможно стоит добавить сначала .ENV payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'yandex-praktikum'}`);
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'yandex-praktikum'}`);
    // payload = jwt.verify(token, 'yandex-praktikum');
    req.user = payload;
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация!');
  }

  next();
};
