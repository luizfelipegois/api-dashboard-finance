const bcrypt = require('bcrypt');
const User = require('../models/user');

const read = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, "-password");

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Server error. Try again later', error: true, errorMessage: error });
  }
};

module.exports = {
  read,
};
