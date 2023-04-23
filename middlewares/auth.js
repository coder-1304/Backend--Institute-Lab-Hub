// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
// const Register = require('../models/register');
import Learner from '../database/models/learner.js';
// import Learner from '../database';

const auth = async (req,res,next)=>{
    try {
        const token = req.body.token;  //getting the token from the cookies of the user's browser
        const verifyUser = jwt.verify(token,"iAmShanneeAhirwarAndThisIsTheSignatureKey");
        // console.log(verifyUser);
        const user = await Learner.findOne({_id:verifyUser._id});  //getting all the information of user from the database
        // console.log(user);
        console.log(user.name+" & "+user.email);
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send("User authentication failed\n"+error);
    }
}

// module.exports = auth;
export default auth;