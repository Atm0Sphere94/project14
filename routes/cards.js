const router = require('express').Router({ mergeParams: true });

const {
  getAllCards, postCard, deleteCard,
} = require('../controllers/cards');

router.get('/cards', getAllCards);
router.post('/cards', postCard);
router.delete('/cards/:id', deleteCard);

module.exports = router;
