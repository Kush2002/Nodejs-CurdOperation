const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required:true,
  },
  description: {
    type: String,
    required:true,
  },
  startDates: {
    type: Date,
    required:true,
  },
  endDates: {
    type: Date,
    required:true,
  },
  username: {
    type: String,
    required:true,
  },
  empName:{
    type:[String],
    required: true,
    validate: {
      validator: function (value) {
        return Array.isArray(value) && value.length > 0;
      },
      message: 'At least one or more employee must be selected.',
    }
  },

  notes: {
    type: String,
    required:true,
  },
  active: {
    type: Boolean,
    default: false,
  }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
