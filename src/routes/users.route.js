const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../helpers/verifyToken');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/login-admin', userController.loginAdmin);
router.post('/delete-user',verifyToken, userController.deleteUser);
router.get('/get-user',verifyToken,userController.getUser);
router.get('/verify-token',verifyToken,userController.verifyToken);
router.put('/update-user',verifyToken,userController.updateUser);

module.exports = router;