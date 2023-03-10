const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const secret = process.env.SECRET;

const connectUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    const { _id } = user;
    const token = jwt.sign({ id: _id }, secret, { expiresIn: '1h' });

    return res.status(200).json({ token, error: false, message: 'Autenticação bem-sucedida' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro de servidor. Tente mais tarde', error: true, errorMessage: error });
  }
};

module.exports = {
  connectUser,
};
