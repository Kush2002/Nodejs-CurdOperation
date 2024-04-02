const Project = require("./../model/projectModel");
const Client = require("../model/clientModel");
const AppError = require('../utils/appError');
const catchAsync = require("../utils/catchAsync");

exports.getAllProject = catchAsync(async(req, res, next) => {
  // const roles = 'admin';
  // const client = await Client.find({ role: { $ne: roles } });
  // console.log('client product controller',client);
  const projects = await Project.find();
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: projects.length,
    data: {
      // client,
      projects,
    },
  });
});

exports.getProject = catchAsync(async(req, res, next) => {
  // const client = await
  const projects = await Project.findById(req.params.id);
  if (!projects) {
    return next(new AppError("No Project found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      projects,
    },
  });
});

exports.createProject = catchAsync(async(req, res, next) => {
    // console.log(req.body);
    const newProject = new Project({
      projectName: req.body.projectName,
      description: req.body.description,
      startDates: req.body.startDates,
      endDates: req.body.endDates,
      username: req.body.username,
      empName:req.body.empName,
      notes: req.body.notes,
    });
    // Save the project to the database
    await newProject.save();
    res.status(201).json({
      status: 'success',
      data: {
        newProject,
      },
    });
});

exports.updateProject = catchAsync(async(req, res, next) => {
  // console.log('project',req.body);
  const { id } = req.params;
  // console.log('id',id);
    const { projectName, description, startDates, endDates, username, empName, notes } = req.body;
    const editproject = await Project.findOneAndUpdate(
      { _id: id },
      { projectName, description, startDates, endDates, username, empName, notes },
      { new: true, runValidators: true }
    );
  // console.log(editproject);
  if (!editproject) {
    return next(new AppError("No Project found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      editproject,
    },
  });
});

exports.deleteProject = catchAsync(async(req, res, next) => {
  try{
    // console.log('project ID',req.params);
    const projectDelete = await Project.findOneAndDelete({_id:req.params.id});
    // console.log('Delete Project Data',projectDelete);
    if (!projectDelete) {
      return next(new AppError("No Project found with that ID", 404));
    }
    res.status(202).json({
      status: 'success',
      data: projectDelete,
    });
  }catch(err){
    console.log(err)
  }
});

