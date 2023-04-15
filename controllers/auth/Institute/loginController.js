import Institute from '../../../database/models/institute.js';
import bcrypt from 'bcryptjs';

// import auth from '../../../middlewares/auth.js'



const loginController = {
    async login(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const exists = await Institute.exists({ email: email });
            if (!exists) {
                res.send('User does not exist');
                res.end();
            }
            const institute = await Institute.findOne({ email: email });
            const isMatch = await bcrypt.compare(password, institute.password);
            if (isMatch) {
                const token = await institute.generateAuthToken();
                res.cookie('jwt', token, {
                    expires: new Date(Date.now() + 50000000),   //in milliseconds 
                    httpOnly: true,
                    // secure: true
                })
                res.send(`<h1>Login Success</h1>`)
                res.end();
            } else {
                res.send(`<h1>Wrong Password</h1>`)
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