const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    phoneNumber: Number,
    role: String,
  },
  { collection: 'users' }
);

module.exports = UserSchema;
