import express from 'express';
import registerController from '../controllers/auth/Learner/registerController.js';
import loginController from '../controllers/auth/Learner/loginController.js';
const router = express.Router();
import auth from '../middlewares/auth.js';

router.post('/register', registerController.register);
router.post('/register/verifyOTP',registerController.verifyOTP);

router.post('/login', loginController.login);
router.post('/logout', loginController.logout);

router.get('/home',auth, (req,res)=>{
    res.send(`<h1>Homepage</h1><h2>Hello ${req.user.fName}</h2>`);
});

export default router;