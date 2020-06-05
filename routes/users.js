const router = require('express').Router({ mergeParams: true });

const {
  getAllUsers, getUser,
} = require('../controllers/users');


router.get('/users/:id', getUser);
router.get('/users', getAllUsers);


module.exports = router;
