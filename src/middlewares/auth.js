const bcrypt = require('bcrypt');
const User = require('../models/user');

const searchForUserInDatabase = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(422).json({ message: 'Email não encontrado', error: true });

    return next();
  } catch (error) {
    return res.status(500).json({ message: 'Erro de servidor. Tente mais tarde', error: true, errorMessage: error });
  }
};

const checkPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (!passwordIsCorrect) return res.status(422).json({ message: 'Senha incorreta', error: true });

    return next();
  } catch (error) {
    return res.status(500).json({ message: 'Erro de servidor. Tente mais tarde', error: true, errorMessage: error });
  }
};

module.exports = {
  searchForUserInDatabase,
  checkPassword,
};