// ==========  ADMIN  ==========
import { admin, adminlogout } from './admin';

// ==========  CLIENT  ==========
import { login, logout } from './login';
import { addTask, addClient } from './addClient';
import { editClient } from './editClient';
import { deleteClientData } from './deleteClientData ';

// ==========  SHOW TASK  ==========
import { showTask } from './showTask';

// ==========  EMPLOYEE  ==========
import {
  empLogin,
  empLogout,
  add_employee,
  editEmployee,
  deleteEmployee,
} from './employee';

// ==================================================  PROJECT  ================================================
import { addProject } from './addProject';
import { editProjectData } from './editProjectData';
import { deleteProjectData } from './deleteProjectData';

// ==================================================  ADMIN  ==================================================
// ADMIN LOGIN
$(document).on('submit', '#adminForm', function (e) {
  e.preventDefault();
  let username = $(this).find('input[name=username]').val();
  let password = $(this).find('input[name=password]').val();
  // console.log(username, password);
  admin(username, password);
});

// ADMIN LOGOUT
$(document).on('click', '#adminlogoutBtn', function (e) {
  e.preventDefault();
  console.log('admin logout');
  adminlogout();
});

// ==================================================  CLIENT  ==================================================
// LOGIN
$(document).on('submit', '#form', function (e) {
  e.preventDefault();
  let username = $(this).find('input[name=username]').val();
  let password = $(this).find('input[name=password]').val();
  login(username, password);
});

// LOGOUT
$(document).on('click', '#logoutBtn', function (e) {
  e.preventDefault();
  console.log('logout');
  logout();
});

// ADD CLIENT
$(document).on('submit', '#add_form', function (e) {
  e.preventDefault();
  let name = $(this).find('input[name=name]').val();
  let username = $(this).find('input[name=username]').val();
  let password = $(this).find('input[name=password]').val();
  let email = $(this).find('input[name=email]').val();
  let phone = $(this).find('input[name=phone]').val();
  let address = $(this).find('input[name=address]').val();
  // console.log(name, username, password, email, phone, address);
  addClient(name, username, password, email, phone, address);
});

// EDIT CLIENT
$(document).on('submit', '#update_user', function (e) {
  e.preventDefault();
  let id = $(this).data('id');
  let name = $(this).find('input[name=name]').val();
  let username = $(this).find('input[name=username]').val();
  let password = $(this).find('input[name=password]').val();
  let email = $(this).find('input[name=email]').val();
  let phone = $(this).find('input[name=phone]').val();
  let address = $(this).find('input[name=address]').val();
  // console.log(id,name, username, password, email, phone, address);
  editClient(id, name, username, password, email, phone, address);
});

// Delete CLIENT
$(document).on('click', '#delete_user', function (e) {
  e.preventDefault();
  let id = $(this).data('id');
  // console.log('id',id);
  deleteClientData(id);
});

// ==================================================  EMPLOYEE  ==================================================

// EMPLOYEE LOGIN
$(document).on('submit', '#employee_login', function (e) {
  e.preventDefault();
  let empEmail = $(this).find('input[name=email]').val();
  let password = $(this).find('input[name=password]').val();
  // console.log(empEmail,password);
  empLogin(empEmail, password);
});

// LOGOUT
$(document).on('click', '#empOut', function (e) {
  e.preventDefault();
  console.log('logout');
  empLogout();
});

// ADD EMPLOYEE
$(document).on('submit', '#employee_form', function (e) {
  e.preventDefault();
  let empId = $(this).find('input[name=employeeID]').val();
  let empName = $(this).find('input[name=employeeName]').val();
  let empEmail = $(this).find('input[name=employeeEmail]').val();
  let password = $(this).find('input[name=password]').val();
  let empPhone = $(this).find('input[name=employeePhone]').val();
  let empAddress = $(this).find('input[name=employeeAddress]').val();
  console.log(empId, empName, empEmail, password, empPhone, empAddress);
  add_employee(empId, empName, empEmail, password, empPhone, empAddress);
});

// EDIT EMPLOYEE
$(document).on('submit', '#employee_edit', function (e) {
  e.preventDefault();
  let id = $(this).data('id');
  let empId = $(this).find('input[name=employeeID]').val();
  let empName = $(this).find('input[name=employeeName]').val();
  let empEmail = $(this).find('input[name=employeeEmail]').val();
  let empPhone = $(this).find('input[name=employeePhone]').val();
  let empAddress = $(this).find('input[name=employeeAddress]').val();
  // console.log(id,empId, empName, empEmail, empPhone, empAddress);
  editEmployee(id, empId, empName, empEmail, empPhone, empAddress);
});

// Delete EMPLOYEE
$(document).on('click', '#delete_employee', function (e) {
  e.preventDefault();
  let id = $(this).data('id');
  // console.log('id',id);
  deleteEmployee(id);
});

// ==================================================  PROJECT  ==================================================

// ADD Project
$(document).on('submit', '#project_form', function (e) {
  e.preventDefault();
  let projectName = $(this).find('input[name=projectName]').val();
  let description = $(this).find('input[name=description]').val();
  let startDates = $(this).find('input[name=startDates]').val();
  let endDates = $(this).find('input[name=endDates]').val();
  let username = $(this).find('select[name=username]').val();
  let empName = [];
  $(this)
    .find('input[name=employeeCheckbox]:checked')
    .each(function () {
      empName.push($(this).val());
    });
  let notes = $(this).find('input[name=notes]').val();
  // console.log(projectName, description, startDates, endDates, username, empName, notes);
  addProject(
    projectName,
    description,
    startDates,
    endDates,
    username,
    empName,
    notes
  );
});

// EDIT Project
$(document).on('submit', '#update_project', function (e) {
  e.preventDefault();
  let id = $(this).data('id');
  let projectName = $(this).find('input[name=projectName]').val();
  let description = $(this).find('input[name=description]').val();
  let startDates = $(this).find('input[name=startDates]').val();
  let endDates = $(this).find('input[name=endDates]').val();
  let username = $(this).find('select[name=username]').val();
  let empName = [];
  $(this)
    .find('input[name=employeeCheckbox]:checked')
    .each(function () {
      empName.push($(this).val());
    });
  let notes = $(this).find('input[name=notes]').val();
  // console.log(id,projectName, description, startDates, endDates, username, empName, notes);
  editProjectData(
    id,
    projectName,
    description,
    startDates,
    endDates,
    username,
    empName,
    notes
  );
});

// ******************************  TASK ADD  ******************************===========================
$(document).on('submit', '#task_add', function (e) {
  e.preventDefault();
  let projectId = $('div[data-id]').data('id');
  let taskName = $(this).find('input[name=taskName]').val();
  let employeeName = $(this).find('select[name=employeeName]').val();
  let description = $(this).find('input[name=description]').val();
  let endDates = $(this).find('input[name=endDates]').val();
  let currentDate = new Date().toLocaleDateString();
  // console.log(
  //   projectId,
  //   taskName,
  //   employeeName,
  //   description,
  //   endDates,
  //   currentDate
  // );
  addTask(
    projectId,
    taskName,
    employeeName,
    description,
    endDates,
    currentDate
  );
});

// ===================================================Show Task Button ==========================================
$(document).ready(function () {
  let isDataVisible = false;
  $('.add').click(function () {
    $('.rowid').attr('data-rowid', $(this).parent().parent('tr').attr('id'));
    var projectId = $(this).data('id');
    var empName = $(this).data('emp');
    if (isDataVisible) {
      $('.taskdata_header, .taskdata_body').remove();
      isDataVisible = false;
    } else {
      // console.log(projectId,empName);
      showTask(projectId, empName);
      isDataVisible = true;
    }
  });
});
