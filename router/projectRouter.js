const express = require("express");
const projectController = require("./../controller/projectController");
const authController = require("./../controller/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    projectController.getAllProject
  )
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    projectController.createProject
  );

router
  .route("/:id")
  .get(projectController.getProject)
  .patch(authController.protect,authController.restrictTo("admin"),projectController.updateProject)
  .delete(authController.protect,authController.restrictTo("admin"),projectController.deleteProject);

module.exports = router;
