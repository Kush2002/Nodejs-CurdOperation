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
    createdAt: new Date(),
  });
  console.log(createTask);
  await createTask.save();
  res.status(201).json({
    status: 'success',
    data: {
      createTask,
    },
  });
});

exports.getTask = catchAsync(async (req, res, next) => {
  const currentDate = new Date().toLocaleString();
  console.log('Date & Time', currentDate);
  const getTask = await Task.find();
  console.log(getTask);
  if (!getTask) {
    return next(new AppError('Not found Task with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    result: getTask.length,
    data: {
      getTask,
    },
  });
});
