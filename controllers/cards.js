const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const BadRequestError = require('../errors/badRequestError');

// GET /cards — возвращает все карточки
const getAllCards = (async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.status(200).send({
      data: cards,
    });
  } catch (error) {
    return next(error);
  }
});

// POST /cards — создаёт карточку
const postCard = (async (req, res, next) => {
  try {
    const {
      name,
      link,
    } = req.body;
    const card = await Card.create({
      name,
      link,
      owner: req.user._id,
    });
    return res.status(201).send({
      data: card,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new BadRequestError(error.message));
    }
    return next(error);
  }
});

// DELETE /cards/:cardId — удаляет карточку по идентификатору
const deleteCard = (async (req, res, next) => {
  try {
    const {
      id,
    } = req.params;
    const card = await Card.findById(id);
    if (!card) {
      return next(new NotFoundError('Not Found')); // здесь проверка, не удалена ли уже карточка
    }
    if (!card.owner.equals(req.user._id)) {
      return next(new ForbiddenError('Unauthorized')); // passes the data to errorHandler middleware
    }
    const cardToDelete = await Card.findByIdAndRemove(id);
    return res.status(200).send({
      message: 'card deleted:',
      data: cardToDelete,
    });
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      return next(new BadRequestError('This id is not valid'));
    }
    return next(err); // passes the data to errorHandler middleware
  }
});


module.exports = {
  getAllCards,
  postCard,
  deleteCard,
};
