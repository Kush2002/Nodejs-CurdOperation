const express = require("express");
const employeeController = require('../controller/employeeController');
const authController = require("./../controller/authController");

const router = express.Router();

router.post('/empLogin', authController.empLogin);
router.get('/logout', authController.logout);
router.route("/create").post(authController.protect,authController.restrictTo("admin"),employeeController.createEmployee);
router.route("/getEmployee").get(authController.protect,employeeController.getAllEmployee);
router.route("/getId/:id").get(employeeController.getEmployee);
router.route("/updateEmployee/:id").patch(authController.protect, authController.restrictTo("admin"), employeeController.updateEmployee);
router.route("/deleteEmployee/:id").delete(authController.protect, authController.restrictTo("admin"), employeeController.deleteEmployee);

module.exports = router;