const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  endDates: {
    type: Date,
    required: true,
  },
  projectId: {
    type: String,
  },
  createdAt: {
    type: Date,
    select: false,
  },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
