const { Router } = require('express');
const { read, remove, update } = require('../controllers/user');
const {
  idIsValid,
  tokenIsValid,
} = require('../middlewares/user');

const router = Router();

router.get('/:id', idIsValid, tokenIsValid, read);

module.exports = router;
