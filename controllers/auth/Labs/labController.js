// import Lab from '../../../database/models/institute.js';
import Lab from '../../../database/models/labs.js';
import bcrypt from 'bcryptjs';
import Joi from 'joi';

// import auth from '../../../middlewares/auth.js'



const labController = {
    async addLab(req, res, next) {
        try {
            // 1) Storing all received Data
            const labName = req.body.labName;
            const description = req.body.description;
            const instituteName = req.body.instituteName;
            const location = req.body.location;
            const available = req.body.available;
            const fees = req.body.fees;
            const country = req.body.country;

            // Loggin received Info
            console.log("Name: " + labName);
            console.log("description: " + description);
            console.log("instituteName: " + instituteName);
            console.log("location: " + location);
            console.log("available: " + available);
            console.log("fees: " + fees);
            console.log("country: " + country);

            // 2) Validation

            const registerSchema = Joi.object({
                labName: Joi.string().min(3).max(40).required(),
                description: Joi.string().min(3).max(500).required(),
                instituteName: Joi.string().min(3).max(30).required(),
                location: Joi.string().min(3).max(50).required(),
                available: Joi.string().min(3).max(40).required(),
                fees: Joi.string().min(3).max(10).required(),
                country: Joi.string().min(3).max(30).required(),
            });

            const { error } = registerSchema.validate(req.body);

            if (error) {
                console.log('Validation Error');
                return next(error);
            }

            // 4) Storing to MongoDB

            // const hashedPassword = await bcrypt.hash(password, 10);

            const lab = new Lab({
                labName: labName,
                description: description,
                instituteName: instituteName,
                location: location,
                available: available,
                fees: fees,
                country: country,
                instituteId: req.user._id,
            });
            lab.save();
            res.send('Lab is added Successfully');
            res.end();

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
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    },
    async getAllLabs(req,res,next){
        try {
            console.log('reached/.....');
            const labs = await Lab.find({});
            console.log(labs);
            res.json(labs);
            res.end();
        } catch (error) {
            res.send(error);
        }
    }
}

export default labController;