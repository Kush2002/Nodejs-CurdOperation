const mongoose = require('mongoose');
const validator = require('validator');

const empSchema = new mongoose.Schema({
    empId: {
        type: String,
    },
    empName: {
        type: String
    },
    empEmail: {
        type: String,
        lowercase: true,
        validate: [validator.isEmail, 'Invalid email address'],
    },
    password: {
        type: String,  
        match: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
        minlength: [12, 'Please enter a password with at least 12 characters']
      },
    empPhone: {
        type: Number,
        validate: {
            validator: function (v) {
                return v.toString().length === 10;
            },
            message: 'Please Enter a 10 Digit Number!',
        },
    },
    empAddress: {
        type: String
    },
    role: {
        type: String,
        enum: ["employee", "user", "admin"],
        default: "employee",
    },
    active: {
        type: Boolean,
        default: true,
    },
});

empSchema.methods.correctPassword = function (candidatePassword, userPassword) {
    // console.log(candidatePassword, userPassword);
    return candidatePassword === userPassword;
  };
const Employee = mongoose.model("Employee",empSchema);

module.exports = Employee;
