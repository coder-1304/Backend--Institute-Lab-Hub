import Joi from 'joi';
import Institute from '../../../database/models/institute.js';
import '../../../services/customErrorHandler.js'
import CustomErrorHandler from '../../../services/customErrorHandler.js';
import bcrypt from 'bcrypt';
import fetch from 'node-fetch';



const registerController = {

    async register(req, res, next) {
        try {
            // 1) Storing all received Data
            const instituteName = req.body.instituteName;
            const email = req.body.email;
            const phone = req.body.phone;
            const address = req.body.address;
            const state = req.body.state;
            const pincode = req.body.pincode;
            const password = req.body.password;

            // Loggin received Info
            console.log("Name: " + instituteName);
            console.log("Email: " + email);
            console.log("Phone: " + phone);
            console.log("Address: " + address);
            console.log("State: " + state);
            console.log("Pincode: " + pincode);
            console.log("Password: " + password);

            // 2) Validation

            const registerSchema = Joi.object({
                instituteName: Joi.string().min(3).max(20).required(),
                address: Joi.string().min(3).max(20).required(),
                state: Joi.string().min(3).max(20).required(),
                pincode: Joi.string().min(4).max(10).required(),
                email: Joi.string().email().required(),
                phone: Joi.string().min(10).max(10).pattern(new RegExp('^[0-9]{10}$')).required(),
                password: Joi.string().min(6).max(20).pattern(new RegExp('^[a-zA-Z-0-9]{3,30}$')).required(),
            });

            const { error } = registerSchema.validate(req.body);

            if (error) {
                console.log('Validation Error');
                return next(error);
            }
            //3)  Check if user is already in the database
            const exists = await Institute.exists({ email: email });
            if (exists) {
                // res.send('The email is already registered to Institute Lab Hub')
                // return next(CustomErrorHandler.alreadyExists('This Email is already taken'));
                res.send('Already Exists');
                res.end();
            }

            // 4) Storing to MongoDB

            // const hashedPassword = await bcrypt.hash(password, 10);

            const institute = new Institute({
                instituteName: instituteName,
                email: email,
                phone: phone,
                address: address,
                state: state,
                pincode: pincode,
                password: password,
            });
            const token = await institute.generateAuthToken();
            institute.save();
            
            // res.cookie('jwt', token, {
            //     expires: new Date(Date.now() + 50000000),   //in milliseconds 
            //     httpOnly: true,
            //     // secure: true
            // });
           

            // //5) Send OTP
            // var url =
            //     `https://2factor.in/API/V1/${apiKey}/SMS/${phone}/AUTOGEN2`;
            // try {
            //     await fetch(url)
            //         .then(res => res.json())
            //         .then(async (data) => {
            //             console.log(data);
            //         })
            //         .catch(err => console.error(err));
            // } catch (error) {
            //     res.json(error);
            // }

            // 6) Send success result

            // res.send('Registration Successful');
            // const currInstitute = await Institute.findOne({ email: email });
            res.json({
                'success': true,
                'token': token
            })
            res.end();

            // res.json({
            //     'success': true
            // })

            // res.send('Hello '+fName+' you are successfully registerd to Insitute lab Hub');
            // res.json({status: 'Working'});
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    },
}


export default registerController;