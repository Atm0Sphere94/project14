const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/', usersRouter);
router.use('/', cardsRouter);
// eslint-disable-next-line no-unused-vars
router.use('*', (req, res) => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
