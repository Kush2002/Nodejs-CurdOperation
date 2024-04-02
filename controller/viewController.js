const Client = require('../model/clientModel');
const Employee = require('../model/employeeModel');
const Project = require('../model/projectModel');
const Task = require('../model/taskModel');
const catchAsync = require('../utils/catchAsync');

// ================================= ***** ADMIN ***** =================================

// ADMIN LOGIN
exports.adminLogin = catchAsync(async (req, res, next) => {
  admin = await Client.findOne({ _id: req.params.id });
  // console.log(login)
  res.status(200).render('adminLogin', {
    title: 'PMS Project',
    text: 'Admin Login',
    admin: admin,
  });
});

//  HOME
exports.getHome = catchAsync(async (req, res, next) => {
  const roles = 'admin';
  let clients;
  let projets;
  if (res.locals.user.role == 'admin') {
    clients = await Client.find({ role: { $ne: roles } });
    projets = await Project.find();
  } else {
    clients = await Client.findOne({ username: res.locals.user.username });
    projets = await Project.find({ username: res.locals.user.username });
    if (!projets || (projets && projets.length === 0)) {
    }
  }
  res.status(200).render('home', {
    title: 'PMS Project',
    text: 'Home Page',
    client: clients,
    project: projets,
    user: res.locals.user,
  });
});

// ================================= ***** CLIENT (ADD,EDIT,DELETE) ***** =================================

// LOGIN
exports.getLogin = catchAsync(async (req, res, next) => {
  const login = await Client.findOne({ _id: req.params.id });
  // console.log(login)
  res.status(200).render('login', {
    title: 'PMS Project',
    text: 'Login',
    log: login,
  });
});

//  CLIENT Managment
exports.getUserManager = catchAsync(async (req, res, next) => {
  const roles = 'admin';
  let clients;
  if (res.locals.user.role == 'admin') {
    clients = await Client.find({ role: { $ne: roles } });
  } else {
    clients = await Client.findOne({ username: res.locals.user.username });
  }
  res.status(200).render('client', {
    title: 'PMS Project',
    text: 'Client Managment',
    client: clients,
    user: res.locals.user,
  });
});

// ADD Client
exports.add_user = catchAsync(async (req, res, next) => {
  const add_user = await Client.find();
  res.status(201).render('add_client', {
    title: 'PMS Project',
    text: 'Add New Client',
    add: add_user,
    user: res.locals.user,
  });
});

// EDIT Client
exports.edit_client = catchAsync(async (req, res, next) => {
  // console.log('data',req.query);
  const edit_client = await Client.findOne({
    username: req.query.username,
  });
  // console.log('=========',edit_user);
  res.status(200).render('edit_Client', {
    title: 'PMS Project',
    text: 'Update Client',
    edit_client: edit_client,
    user: res.locals.user,
  });
});

// DELETE Client
exports.deleteUser = catchAsync(async (req, res, next) => {
  // console.log(req.params);
  const deleteuser = await Client.findOne({ _id: req.params.id });
  // console.log(user);
  res.status(200).render('home', {
    title: 'PMS Project',
    user: res.locals.user,
    deleteusers: deleteuser,
  });
});

// ================================= ***** EMPLOYEE (ADD,EDIT,DELETE) ***** =================================

exports.empLogin = catchAsync(async (req, res, next) => {
  const login = await Employee.findOne({ _id: req.params.id });
  // console.log(login);
  res.status(200).render('empLogin', {
    title: 'PMS Project',
    text: 'Employee Login',
    login: login,
  });
});

exports.getEmployeeManager = catchAsync(async (req, res, next) => {
  let roles;
  let client;
  let employee;
  if (res.locals.emp && res.locals.emp.role === 'employee') {
    roles = 'employee';
    employee = await Employee.find({ role: { $ne: roles } });
    employee = await Employee.find();
  } else if (res.locals.user && res.locals.user.role === 'admin') {
    roles = 'admin';
    client = await Client.find({ role: { $ne: roles } });
    employee = await Employee.find();
  }
  res.status(200).render('employee', {
    title: 'PMS || Employee Managment',
    text: 'Employee Management',
    employee: employee,
    emp: res.locals.employee,
    client: client,
    user: res.locals.user,
  });
});

// ADD Employee
exports.add_employee = catchAsync(async (req, res, next) => {
  const add_employee = await Employee.find();
  // console.log(add_employee);
  res.status(201).render('add_employee', {
    title: 'PMS Project',
    text: 'Add New Employee',
    add: add_employee,
    user: res.locals.user,
  });
});

// EDIT EMPLOYEE
exports.editEmployee = catchAsync(async (req, res, next) => {
  // console.log('data',req.query);
  const roles = 'admin';
  const client = await Client.find({ role: { $ne: roles } });
  const editEmployee = await Employee.findOne({ _id: req.params.id });
  console.log(editEmployee);
  res.status(200).render('edit_employee', {
    title: 'PMS Project',
    text: 'Update Employee',
    client: client,
    editEmployee: editEmployee,
    user: res.locals.user,
  });
});

// DELETE EMPLOYEE
exports.deleteEmployee = catchAsync(async (req, res, next) => {
  // console.log(req.params);
  const deleteEmployee = await Employee.findOne({ _id: req.params.id });
  // console.log(deleteEmployee);
  res.status(200).render('employee', {
    title: 'PMS Project',
    user: res.locals.user,
    deleteEmployee: deleteEmployee,
  });
});

// ================================= ***** PROJECT (ADD,EDIT,DELETE) ***** ===============================================

// Project Management

exports.getProjectManager = catchAsync(async (req, res, next) => {
  const adminRole = 'admin';
  const employeeRole = 'employee';
  let clients;
  let projects;
  let task;
  let employee;
  if (res.locals.user && res.locals.user.role === adminRole) {
    clients = await Client.find({ role: { $ne: adminRole } });
    employee = await Employee.find();
    task = await Task.find();
    projects = await Project.find();
  } else if (res.locals.emp && res.locals.emp.role === employeeRole) {
    // console.log(empName);
    employee = await Employee.find({ role: { $ne: employeeRole } });
    const roles = 'admin';
    clients = await Client.find({ role: { $ne: roles } });
    const empNames = res.locals.emp.empName;
    projects = await Project.find({ empName: { $in: empNames } });
    task = await Task.find();
    // console.log(task);
  } else {
    const username = res.locals.user ? res.locals.user.username : null;
    // console.log(username);
    clients = await Client.find();
    task = await Task.find();
    employee = await Employee.find();
    projects = await Project.find({ username });
  }
  // console.log('Task', task);
  // console.log('Employee:', employee);
  res.status(200).render('project', {
    title: 'PMS Project',
    text: 'Project Management',
    client: clients,
    project: projects,
    task: task,
    employee: employee,
    emp: res.locals.emp,
    user: res.locals.user,
  });
});

// ================================= ***** ADD TASK ***** =================================
// ADD TASK
exports.add_task = catchAsync(async (req, res, next) => {
  const adminRole = 'admin';
  const employeeRole = 'employee';
  let clients;
  let projects;
  let employee;
  let task;
  if (res.locals.user && res.locals.user.role === adminRole) {
    clients = await Client.find({ role: { $ne: adminRole } });
    clients = await Client.find();
    employee = await Employee.find();
    projects = await Project.find();
    task = await Task.find();
  } else if (res.locals.emp && res.locals.emp.role === employeeRole) {
    employee = await Employee.find({ role: { $ne: employeeRole } });
    const roles = 'admin';
    clients = await Client.find({ role: { $ne: roles } });
    employee = await Employee.find();
    projects = await Project.find();
    task = await Task.find();
  } else {
    const username = res.locals.user ? res.locals.user.username : null;
    clients = await Client.find({ username });
    const roles = 'admin';
    clients = await Client.find({ role: { $ne: roles } });
    employee = await Employee.find();
    projects = await Project.find();
    task = await Task.find();
  }
  res.status(201).render('add_task', {
    title: 'PMS Project',
    text: 'Project Management',
    client: clients,
    project: projects,
    employee: employee,
    emp: res.locals.emp,
    user: res.locals.user,
  });
});

// ADD PORJECT
exports.add_project = catchAsync(async (req, res, next) => {
  const roles = 'admin';
  const client = await Client.find({ role: { $ne: roles } });
  // console.log(client);
  const add_project = await Project.find();
  const add_employee = await Employee.find();
  // console.log(add_employee);
  res.status(201).render('add_project.ejs', {
    title: 'PMS Project',
    txt: 'Add New Project',
    client: client,
    add_projects: add_project,
    add_employee: add_employee,
    user: res.locals.user,
  });
});

// EDIT PROJECT
exports.edit_project = catchAsync(async (req, res, next) => {
  const roles = 'admin';
  const clients = await Client.find({ role: { $ne: roles } });
  const edit_project = await Project.findOne({ _id: req.params.id });
  const employees = await Employee.find();
  res.status(200).render('edit_Project', {
    title: 'PMS Project',
    text: 'Update Project',
    client: clients,
    employee: employees,
    edit_project: edit_project,
    user: res.locals.user,
  });
});

// DELETE Project
exports.deleteProject = catchAsync(async (req, res, next) => {
  // console.log(req.params);
  const deleteproject = await Project.findOne({ _id: req.params.id });
  // console.log(deleteproject);
  res.status(200).render('project', {
    title: 'PMS Project',
    user: res.locals.user,
    deleteproject: deleteproject,
  });
});
