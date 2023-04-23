import bcrypt from 'bcryptjs';
import twilio from 'twilio';
import Learner from '../../../database/models/learner.js';
import Institute from '../../../database/models/institute.js';
import Lab from '../../../database/models/labs.js';


const instituteLabsController = {
    async instituteLabs(req, res, next) {
        try {
            console.log('Coming here==>')
            const labs = await Lab.find({instituteId: req.user._id});
            res.json(labs);
            res.end();
        } catch (error) {
            console.log(error);
            res.json(error);
            res.end();
        }
        // res.end();
    },
    async bookedLearners(req, res, next) {
        try {
            const labId = req.body.labId
            console.log('Coming here==>')
            const labs = await Lab.findOne({ _id: labId }).select('bookings');
            res.json(labs);
            res.end();
        } catch (error) {
            console.log(error);
            res.json(error);
            res.end();
        }
        // res.end();
    },
}

export default instituteLabsController;