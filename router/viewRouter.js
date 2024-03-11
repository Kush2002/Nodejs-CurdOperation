const express = require('express');
const viewController = require('../controller/viewController');
const authController = require('../controller/authController');

const router = express.Router();

// ADMIN LOGIN 
router.get('/admin',authController.isLoggedIn,viewController.adminLogin);
// LOGIN & HOME
router.get('/',authController.isLoggedIn,viewController.getLogin);
router.get('/home', authController.isLoggedIn,viewController.getHome);

// CLIENT MANAGEMENT SYSTEM
router.get('/client',authController.isLoggedIn,viewController.getUserManager);
router.get('/add_client',authController.protect,authController.restrictTo('admin'),viewController.add_user);
router.get('/edit_client/:id',authController.protect,authController.restrictTo('admin'),viewController.edit_client);
router.get('/user/:id',authController.protect,authController.restrictTo('admin'),viewController.deleteUser);

// EMPLOYEE MANAGEMENT SYSTEM
router.get('/employeeLogin',authController.isLoggedIn,viewController.empLogin)
router.get('/employee',authController.isLoggedIn,viewController.getEmployeeManager);
// router.get('/emp',authController.isLoggedIn,viewController.getEmp);
router.get('/add_employee',authController.protect,authController.restrictTo('admin'),viewController.add_employee);
router.get('/edit_employee/:id',authController.protect,authController.restrictTo('admin'),viewController.editEmployee);
router.get('/delete_employee/:id',authController.protect,authController.restrictTo('admin'),viewController.deleteProject);

// PROJECT MANAGEMENT SYSTEM
router.get('/project',authController.isLoggedIn,viewController.getProjectManager);
router.get('/add_task',authController.protect,viewController.add_task);
router.get('/add_project',authController.protect,authController.restrictTo('admin'), viewController.add_project);
router.get('/edit_Project/:id',authController.protect,authController.restrictTo('admin'),viewController.edit_project);
router.get('/project/:id',authController.protect,authController.restrictTo('admin'),viewController.deleteProject);

module.exports = router;
