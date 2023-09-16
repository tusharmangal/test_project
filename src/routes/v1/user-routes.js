const express = require('express');
const { UserController } = require('../../controllers');
const { AuthRequestMiddlewares } = require('../../middlewares');

const router = express.Router();

router.post('/insert',AuthRequestMiddlewares.validateAuthRequest,UserController.signup);
router.post('/signin',AuthRequestMiddlewares.validateAuthRequest,UserController.signin);
// router.post('/signin',AuthRequestMiddlewares.validateAuthRequest,  UserController.signin);
// router.post('/role',AuthRequestMiddlewares.checkAuth, AuthRequestMiddlewares.isAdmin, UserController.addRoleToUser);
router.get('/:id',UserController.getuser)
router.delete('/:id',UserController.destroyUser)
router.put('/:id',AuthRequestMiddlewares.validateAuthRequest,UserController.updateUser)
router.get('/image/:id',UserController.getuserImage)
module.exports = router;