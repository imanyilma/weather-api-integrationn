const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
    type: String,
    required: function () {
      // password required **only if no googleId**
      return !this.googleId;
    }
  },
  googleId: { type: String }, // optional, only for OAuth
});

const User = mongoose.model('User', userSchema);
module.exports = User;
