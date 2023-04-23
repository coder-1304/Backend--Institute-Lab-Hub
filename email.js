// // const nodemailer = require('nodemailer');
// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'institutelabhub@gmail.com',
//     pass: 'InstituteLabHub123'
//   }
// });

// const mailOptions = {
//   from: 'shanneeahirwar20174@acropolis.in',
//   to: 'shanneeahirwar@gmail.com',
//   subject: 'Test Email',
//   text: 'This is a test email sent from Node.js!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

import twilio from 'twilio';
// var message = `Dear [Student Name], your booking at [Institute Name] in 
// [Institute Location] has been confirmed for [Lab Name] on [Booking Time].
// The total fee is [Fees]. Your Booking ID is [Booking ID].
// Thank you for choosing [Institute Name]. Have a great day!`
var message = `Dear Shannee Ahirwar, your booking at AITR in 
Indore has been confirmed for AWS Lab on 12-3.
The total fee is 1200. Your Booking ID is BOKID90.
Thank you for choosing . Have a great day!`

const accountSid = 'AC268b88d6bbc848c22c903a179e11844e';
const authToken = 'd9bfc5b9da97bce7a956e0cdbd91d1d9';
const client = twilio(accountSid, authToken);

client.messages.create({
    to: '+919009342733',
    from: '+16206999359',
    body: message
})
.then((message) => console.log(`SMS sent with message ID: ${message.sid}`))
.catch((error) => console.error(`Error sending SMS: ${error.message}`));

