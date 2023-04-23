import jwt from 'jsonwebtoken';
import Institute from '../database/models/institute.js';

const instituteAuth = async (req,res,next)=>{
    try {
        const token = req.body.token;  //getting the token from the cookies of the user's browser
        const verifyUser = jwt.verify(token,"iAmShanneeAhirwarAndThisIsTheSignatureKey");
        // console.log(verifyUser);
        const user = await Institute.findOne({_id:verifyUser._id});  //getting all the information of user from the database
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send("User authentication failed\n"+error);
    }
}
export default instituteAuth;