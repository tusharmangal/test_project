const express = require('express');
const { UserController } = require('../../controllers');
const { AuthRequestMiddlewares } = require('../../middlewares');

const router = express.Router();

router.post('/signup',UserController.signup);
router.post('/signin',AuthRequestMiddlewares.validateAuthRequest,UserController.signin);
// router.post('/signin',AuthRequestMiddlewares.validateAuthRequest,  UserController.signin);
// router.post('/role',AuthRequestMiddlewares.checkAuth, AuthRequestMiddlewares.isAdmin, UserController.addRoleToUser);
module.exports = router;