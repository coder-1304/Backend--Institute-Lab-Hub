// const bcrypt = require('bcryptjs/dist/bcrypt');
// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from  'jsonwebtoken';
import {SECRET_KEY} from '../../config/index.js'
// const res = require('express/lib/response');
const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        require: true
    },
    lName: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    DOB: {
        type: String,
        require: true,
    },
    institute: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    verified: {
        type: Boolean,
    },
    address: String,
    password: {
        type: String,
        require: true
    },
    bookings: [{ type: mongoose.Schema.Types.Mixed }],
    tokens: [{
        token: {
            type: String,
            require: false
        }
    }]
})



//Generating Tokens
userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString()}, "iAmShanneeAhirwarAndThisIsTheSignatureKey")
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        console.log('token is generated: ' + token);
        return token;
    } catch (error) {
        res.send(error);
        console.log('token not generated' + error);
    }
}



// Converting Password=>Hash
//middleware for hashing
//this will be executed before calling save method .pre()
// 'save' is event that is before save function is called

userSchema.pre('save', async function (next) {
    // Since the hashing should only be applied when password is being modified :
    if (this.isModified('password')) {
        // console.log('Current Password: ' + this.password);
        this.password = await bcrypt.hash(this.password, 10);   // hashing with 10 rounds more rounds = more time for algorithm to create hash password and longer it will take
        // console.log('Current Password: ' + this.password);
    }
    next();  //means now save method will be called
})




const Learner = new mongoose.model('Learner', userSchema);
// module.exports = Learner;
export default Learner;
// module.exports = mongoose.model('Learner', userSchema);
