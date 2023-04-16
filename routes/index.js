import express from 'express';
import registerController from '../controllers/auth/Learner/registerController.js';
import loginController from '../controllers/auth/Learner/loginController.js';
import instituteRegisterController from '../controllers/auth/Institute/registerController.js';
import instituteLoginController from '../controllers/auth/Institute/loginController.js';
import labController from '../controllers/auth/Labs/labController.js';
const router = express.Router();
import auth from '../middlewares/auth.js';
import instituteAuth from '../middlewares/instituteAuth.js';

router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.post('/register/verifyOTP',registerController.verifyOTP);


router.post('/instituteRegister', instituteRegisterController.register);
router.post('/instituteLogin', instituteLoginController.login);

//labs
router.post('/addLab',instituteAuth, labController.addLab);
router.get('/getAllLabs', labController.getAllLabs);


router.post('/logout', loginController.logout);

router.get('/home',auth, (req,res)=>{
    res.send(`<h1>Homepage</h1><h2>Hello ${req.user.fName}</h2>`);
});

export default router;