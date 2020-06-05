const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');

// GET /cards — возвращает все карточки
const getAllCards = (async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.status(200).send({ data: cards });
  } catch (error) {
    return next(error);
  }
});

// POST /cards — создаёт карточку
const postCard = (async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });
    return res.status(201).send({ data: card });
  } catch (error) {
    return next(error);
  }
});

// DELETE /cards/:cardId — удаляет карточку по идентификатору
const deleteCard = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    const cardToDelete = await Card.findByIdAndRemove(id);
    return res.status(200).send({ message: 'card deleted:', data: cardToDelete });
  } catch (error) {
    return next(error);
  }
});


module.exports = {
  getAllCards,
  postCard,
  deleteCard,
};
