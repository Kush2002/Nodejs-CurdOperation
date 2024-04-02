const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  token: {
    type: String
  },
  name: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email address'],
  },
  password: {
    type:String,  
    match:/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
    minlength:[12, 'Please Enter Password Char 12']
  },
  phone: {
    type: Number,
    validate: {
      validator: function(v) {
        return v.toString().length === 10;
      },
      message: 'Please Enter a 10 Digit Number!',
    },
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre('save', async function (next) {
  // this.password = await bcrypt.hash(this.password, 12);
  this.password
  next();
});

// userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
//   return await bcrypt.compare(candidatePassword, userPassword)
// };
// userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };
userSchema.methods.correctPassword = function (candidatePassword, userPassword) {
  // console.log(candidatePassword, userPassword);
  return candidatePassword === userPassword;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
