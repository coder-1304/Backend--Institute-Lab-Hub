import Joi from 'joi';
import Learner from '../../../database/models/learner.js';
import '../../../services/customErrorHandler.js'
import CustomErrorHandler from '../../../services/customErrorHandler.js';
import bcrypt from 'bcrypt';
import fetch from 'node-fetch';


var apiKey = '8bc76006-add0-11ed-813b-0200cd936042';

// function returnHTML(phone) {
//     return `
//     `;
// }

const registerController = {

    async register(req, res, next) {
        try {
            // 1) Storing all received Data
            const fName = req.body.fName;
            const lName = req.body.lName;
            const email = req.body.email;
            const phone = req.body.phone;
            const DOB = req.body.DOB;
            const gender = req.body.gender;
            const institute = req.body.institute;
            const course = req.body.course;
            const password = req.body.password;
            const repeatPassword = req.body.repeatPassword;
            // Loggin received Info
            console.log("First Name: " + fName);
            console.log("Last Name: " + lName);
            console.log("Email: " + email);
            console.log("Phone: " + phone);
            console.log("DOB: " + DOB);
            console.log("Gender: " + gender);
            console.log("Institute: " + institute);
            console.log("Course: " + course);
            console.log("Password: " + password);

            // 2) Validation

            const registerSchema = Joi.object({
                fName: Joi.string().min(3).max(20).required(),
                lName: Joi.string().min(3).max(20).required(),
                email: Joi.string().email().required(),
                phone: Joi.string().min(10).max(10).pattern(new RegExp('^[0-9]{10}$')).required(),
                DOB: Joi.date().max('now').required(),
                gender: Joi.string().required(),
                institute: Joi.string().required(),
                course: Joi.string().required(),
                password: Joi.string().min(6).max(20).pattern(new RegExp('^[a-zA-Z-0-9]{3,30}$')).required(),
                repeatPassword: Joi.ref('password'),
            });

            const { error } = registerSchema.validate(req.body);

            if (error) {
                console.log('Validation Error');
                return next(error);
            }
            //3)  Check if user is already in the database
            const exists = await Learner.exists({ email: email });
            if (exists) {
                // res.send('The email is already registered to Institute Lab Hub')
                // return next(CustomErrorHandler.alreadyExists('This Email is already taken'));
                res.send('Already Exists');
                res.end();
            }

            // 4) Storing to MongoDB

            // const hashedPassword = await bcrypt.hash(password, 10);

            const learner = new Learner({
                fName: fName,
                lName: lName,
                email: email,
                phone: phone,
                DOB: DOB,
                gender: gender,
                institute: institute,
                course: course,
                password: password,
                verified: false
            });
            const token = await learner.generateAuthToken();
            learner.save();
            
            // res.cookie('jwt', token, {
            //     expires: new Date(Date.now() + 50000000),   //in milliseconds 
            //     httpOnly: true,
            //     // secure: true
            // });
           

            //5) Send OTP
            var url =
                `https://2factor.in/API/V1/${apiKey}/SMS/${phone}/AUTOGEN2`;
            try {
                await fetch(url)
                    .then(res => res.json())
                    .then(async (data) => {
                        console.log(data);
                    })
                    .catch(err => console.error(err));
            } catch (error) {
                res.json(error);
            }

            // 6) Send success result

            // res.send(returnHTML(phone));
            res.json({
                'success': true,
                'token': token
            })

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

    async verifyOTP(req, res, next) {

        const phone = req.body.phone;
        const otp = req.body.otp
        console.log(otp);
        // const learner = await Learner.findOne({ phone: phone });



        function handle(data) {
            if (data['Details'] != 'OTP Matched') {
                // const learner = new Learner({
                //     verified: true
                // });
                // learner.save();
                // res.send('<h1>Wrong OTP<h1>');
                res.json({
                    'success': false
                });
                res.end();
            } else {
                // const update = { $set: { verified: true } };
                Learner.updateOne({ phone:phone }, { verified: true }).then((data) => {
                    console.log('Updated =======>');
                    // res.send('Profile Pic Updated');
                    // res.end();
                }).catch((error) => {
                    console.log(error);
                    res.json(error);
                    res.end();
                    // res.json(error);
                });
                
                // res.send('<h1>Welcome to Institute Lab Hub :)</h1>');
                res.json({
                    'success': true
                })
                res.end();
            }

        }
        console.log(`https://2factor.in/API/V1/${apiKey}/SMS/VERIFY3/${phone}/${otp}`);
        await fetch(`https://2factor.in/API/V1/${apiKey}/SMS/VERIFY3/${phone}/${otp}`)
            .then((response) => response.json())
            .then(async (data) => {
                console.log(data);
                handle(data);           
            });
    }
}


export default registerController;