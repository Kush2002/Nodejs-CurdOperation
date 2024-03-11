const Task = require('../model/taskModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createTask = catchAsync(async (req, res, next) => {
  const createTask = new Task({
    taskName: req.body.taskName,
    employeeName: req.body.employeeName,
    description: req.body.description,
    endDates: req.body.endDates,
    projectId: req.body.projectId,
  });
  // console.log(createTask);
  await createTask.save();
  res.status(201).json({
    status: 'success',
    data: {
      createTask,
    },
  });
});
