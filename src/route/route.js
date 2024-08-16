const express=require('express')
const router=express.Router()
const userController=require('../controller/userController')
const { authentication} = require('../middleware/auth')



router.post('/registerUser', userController.registerUser);
router.post('/login', authentication.userController.login);
router.post('/forgotPassword', userController.forgotPassword);






module.exports=router