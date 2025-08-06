const express=require('express');
const userController=require('../UserController');

const router=express.Router();


router.get('/users', userController.getAllAccount);
router.post('/users/create', userController.createAccount);
router.post('/users/login', userController.login);
router.get('/users/logout', userController.logout);

router.post('/users/forgotPassword', userController.forgotPassword);
router.get('/users/getCurrentAccount', userController.getCurrentAccount);
router.post('/users/editAccount', userController.editAccount);
router.post('/users/updatePassword', userController.updatePassword);
router.post('/users/setPassword', userController.setPassword);

module.exports=router;