const { Router } = require('express');
const {
  connectUser,
} = require('../controllers/auth');

const {
  searchForUserInDatabase,
  checkPassword,
} = require('../middlewares/auth');

const router = Router();

router.post('/signIn', searchForUserInDatabase, checkPassword, connectUser);

module.exports = router;
