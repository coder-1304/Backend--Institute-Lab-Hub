import bcrypt from 'bcryptjs';
import twilio from 'twilio';
import Learner from '../../../database/models/learner.js';
import Institute from '../../../database/models/institute.js';
import Lab from '../../../database/models/labs.js';

const searchController = {
    async search(req, res, next) {
        try {
            const searchBy = req.body.searchBy;
            const substring = req.body.searchText;

            if (searchBy == 'Search by Institute') {
                const labs = await Lab.find({
                    $and: [
                        { instituteName: { $regex: new RegExp(substring, 'i') } }, // search for documents with the substring in the instituteName field, ignoring case sensitivity
                        { availableSeats: { $gte: 0 } } // search for documents with availableSeats greater than or equal to 0
                    ]
                });


                res.json(labs);
                res.end()

            } else if (searchBy == 'Search by Location') {
                const labs = await Lab.find({
                    $and: [
                        { location: { $regex: new RegExp(substring, 'i') } }, // search for documents with the substring in the instituteName field, ignoring case sensitivity
                        { availableSeats: { $gte: 0 } } // search for documents with availableSeats greater than or equal to 0
                    ]
                });

                res.json(labs);
                res.end()

            } else {
                const labs = await Lab.find({
                    $and: [
                        { labName: { $regex: new RegExp(substring, 'i') } }, // search for documents with the substring in the instituteName field, ignoring case sensitivity
                        { availableSeats: { $gte: 0 } } // search for documents with availableSeats greater than or equal to 0
                    ]
                });

                res.json(labs);
                res.end()

            }

            // const labs = await Lab.find({
            //     labName: { $regex: new RegExp(substring, 'i') } // search for documents with the substring in the location field, ignoring case sensitivity
            // });

            // res.json(labs);
            // res.end();
            // const labs = await Lab.find({ instituteId: req.user._id });
            // res.json(labs);
            // res.end();
        } catch (error) {
            console.log(error);
            res.end();
        }
        // res.end();
    }
}

export default searchController;