const express = require('express');
const taskController = require('../controller/taskController');
const authController = require('../controller/authController');

const router = express.Router();

router
  .route('/addTask')
  .post(authController.protect, taskController.createTask);

router.route('/getTask').post(taskController.getTask);

module.exports = router;
