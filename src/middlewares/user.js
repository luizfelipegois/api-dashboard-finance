const jwt = require('jsonwebtoken');
const User = require('../models/user');

const idIsValid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, '-password');

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado', error: true });

    return next();
  } catch (error) {
    return res.status(500).json({ message: 'Erro de servidor. Tente mais tarde', error: true, errorMessage: error });
  }
};

const tokenIsValid = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;
    const secret = process.env.SECRET;
    const data = await jwt.decode(token, { payload: true });

    if (!token) return res.status(511).json({ message: 'Authentication necessária', error: true });
    if (!jwt.verify(token, secret)) return res.status(511).json({ message: 'Acesso negado', error: true });
    if (id !== data.id) return res.status(511).json({ message: 'Acesso negado', error: true });

    return next();
  } catch (error) {
    return res.status(500).json({ message: 'Erro de servidor. Tente mais tarde', error: true, errorMessage: error });
  }
};

module.exports = {
  idIsValid,
  tokenIsValid,
};
