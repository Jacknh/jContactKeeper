const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name required"]
  },
  email: {
    type: String,
    required: [true, "email required"],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'invalid email'],
    unique: true
  },
  password: {
    type: String,
    select: false,
    required: [true, 'password required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Document middleware
UserSchema.pre('save', async function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

})

module.exports = mongoose.model('User', UserSchema)