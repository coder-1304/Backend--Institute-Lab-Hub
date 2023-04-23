import bcrypt from 'bcryptjs';
import twilio from 'twilio';
import Learner from '../../../database/models/learner.js';
import Institute from '../../../database/models/institute.js';
import Lab from '../../../database/models/labs.js';


const learnerLabsController = {
    async learnerLabs(req, res, next) {
        try {
            const labs = req.user.bookings;
            res.json(labs);
            res.end();
        } catch (error) {
            res.json(error);
            res.end();
        }
        // res.end();
    },
}

export default learnerLabsController;