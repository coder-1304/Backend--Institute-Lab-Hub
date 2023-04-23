import Learner from '../../../database/models/learner.js';
import bcrypt from 'bcryptjs';

// import auth from '../../../middlewares/auth.js'



const loginController = {
    async login(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const exists = await Learner.exists({ email: email });
            if (!exists) {
                res.send('User does not exist');
                res.end();
            }
            const learner = await Learner.findOne({ email: email });
            const isMatch = await bcrypt.compare(password, learner.password);
            if (isMatch) {
                const token = await learner.generateAuthToken();
                // res.cookie('jwt', token, {
                //     expires: new Date(Date.now() + 50000000),   //in milliseconds 
                //     httpOnly: true,
                //     // secure: true
                // })
                // res.send(`<h1>Login Success</h1>`)
                res.json({
                    'success': true,
                    'token': token
                })
                res.end();
            } else {
                res.json({
                    'success': false
                })
                res.end();
            }
        } catch (error) {
            res.json(error);
            res.end();
        }
        res.end();
    },
    async logout(req,res,next){
        req.user.tokens = []; 
        res.clearCookie("jwt");
        await req.user.save();  //saving the cleared cookie
        console.log('logged out successfully');
        res.send('<h1>Logged out successfully</h1>')
        res.end();
    }
}

export default loginController;