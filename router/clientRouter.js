const express = require('express');
const authController = require('../controller/authController');
const clientController = require('../controller/clientController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/adminLogin', authController.adminLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
//   This Router Get UserData

// This Router Create
router
.route('/')
.get(authController.protect,authController.restrictTo('admin'),clientController.getUser)
.post(authController.protect,authController.restrictTo('admin'),clientController.createUser);

router
.route('/:id')
.patch(authController.protect,authController.restrictTo('admin'),clientController.updateUser)
.delete(authController.protect,authController.restrictTo('admin'),clientController.deleteUser);


module.exports = router;
