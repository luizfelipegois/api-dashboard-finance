const mongoose = require('mongoose');

const User = mongoose.model('Users', {
  _id: String,
  name: String,
  email: String,
  password: String,
  datas: Object,
});

module.exports = User;
