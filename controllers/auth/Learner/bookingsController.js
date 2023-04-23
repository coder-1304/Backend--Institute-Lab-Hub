import bcrypt from 'bcryptjs';
import twilio from 'twilio';
import Learner from '../../../database/models/learner.js';
import Institute from '../../../database/models/institute.js';
import Lab from '../../../database/models/labs.js';

function generateRandomId() {
    const length = 10;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }

    return result;
}

function sendMessage(studentDetails, labDetails) {
    var message = `\nDear ${studentDetails.name}, your booking at ${labDetails.instituteName} in 
${labDetails.location} has been confirmed for ${labDetails.labName} lab on ${labDetails.date}.
The total fee is ₹${labDetails.fees}. Your Booking ID is ${studentDetails.bookingId}.
Thank you for choosing. Have a great day!`

    const accountSid = 'AC268b88d6bbc848c22c903a179e11844e';
    const authToken = 'd9bfc5b9da97bce7a956e0cdbd91d1d9';
    const client = twilio(accountSid, authToken);

    client.messages.create({
        to: `+91${studentDetails.phone}`,
        from: '+16206999359',
        body: message
    })
        .then((message) => { return true })
        .catch((error) => console.error(`Error sending SMS: ${error.message}`));

}


const bookingsController = {
    async bookSeat(req, res, next) {
        console.log('coming');
        try {
            // const learner = await Learner.findOne({ email: email });
            var bookings = req.user.bookings;

            const fName = req.body.fName;
            const lName = req.body.lName;
            const email = req.body.email;
            const phone = req.body.phone;
            const gender = req.body.gender;
            const labId = req.body.labId;


            const lab = await Lab.findOne({ _id: labId });
            if(lab.availableSeats == 0){
                res.json({
                    'available': false
                });
                res.end();
            }

            // const date = req.body.date;
            // const time = req.body.time;
            // const institute = req.body.institute;
            // const course = req.body.course;
            // const password = req.body.password;
            // const repeatPassword = req.body.repeatPassword;
            console.log('Got lab:\n');
            console.log(lab);
            // const bookingId = await generateRandomId;
            const bookingId =  generateRandomId();
            const studentDetails = {
                'name': fName + ' ' + lName,
                'email': email,
                'phone': phone,
                'gender': gender,
                'bookingId': bookingId,
            }


            let labDetails = {
                'bookingId': bookingId,
                'phone': req.user.phone,
                'labId': labId,
                'labName': lab.labName,
                'description': lab.description,
                'instituteName': lab.instituteName,
                'location': lab.location,
                'available': lab.available,
                'fees': lab.fees,
                'date': lab.date,
                'country': lab.country,
                'instituteId': lab.instituteId
            }
            sendMessage(studentDetails, labDetails)
            // console.log('message sent!!!!!!!!');
            const currBookings = req.user.bookings;
            currBookings.push(labDetails)
            console.log(currBookings);
            // Updating learner
            const update = { $set: { bookings: currBookings } };
            await Learner.updateOne({ _id: req.user._id }, update).then((data) => {
                console.log('Updated =======>');
            }).catch((error) => {
                console.log(error);
                res.json(error);
                res.end();
            });
            // Updating Lab
            const currLab = await Lab.findOne({_id:labId});
            let labBookings = currLab.bookings;
            let currAvailableSeats = currLab.availableSeats-1;
            labBookings.push(studentDetails);
            const labUpdate = { $set: { bookings: labBookings, availableSeats: currAvailableSeats  } };
            await Lab.updateOne({ _id: labId }, labUpdate).then((data) => {
                console.log('Updated =======>');
            }).catch((error) => {
                console.log(error);
                res.json(error);
                res.end();
            });
            // sending response
            res.json({ 'success': true });
            res.end();
        } catch (error) {
            res.json(error);
            res.end();
        }
        // res.end();
    },
}

export default bookingsController;