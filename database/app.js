require('dotenv').config();
const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const port = process.env.PORT || 8000
require('./db/connection')
const Register = require('./models/register');

const cookieParser = require('cookie-parser');  // To get the cookies on user's browser
app.use(cookieParser());
const bcrypt = require('bcryptjs');
const auth = require('./middleware/auth');

// const staticPath = path.join(__dirname, "..");
const templatePath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");
const staticPath = path.join(__dirname, '../public');
app.use(express.static(staticPath));

app.set("view engine", "hbs");
// app.set('views', '../template/views');
app.set('views', templatePath);
hbs.registerPartials(partialsPath);
app.use(express.urlencoded({ extended: false }));




// console.log(process.env.SECRET_KEY);

app.get('/login', (req, res) => {
    res.render("gym-login");
});
app.get('/register', (req, res) => {
    res.render("gym-register");
});
app.get('/logout',auth, async (req, res) => {
    try {
        //deleting that particular token from the database
        // logging out from only one device, others remains logged in:
        // req.user.tokens = req.user.tokens.filter((currElement) =>{
        //     return currElement.token != req.token;
        // })

        //logout from all devices:
        req.user.tokens = []; 

        res.clearCookie("jwt");
        await req.user.save();  //saving the cleared cookie
        console.log('logged out successfully');
        res.redirect('http://localhost:8000/login');
        res.end();
    } catch (error) {
        res.status(500).send('error '+error);
    }
});

app.get('/home',auth,(req, res) => {
    console.log('This is token value in cookie: '+ req.cookies.jwt);
    res.render("home");
});
app.get('/secret',auth,(req, res) => {
    console.log('This is token value in cookie: '+ req.cookies.jwt);
    res.render("secret");
});

app.post('/verifyRegister', async (req, res) => {
    if (req.body.password != req.body.Cpassword) {
        res.send('passwords are not matching');
        return;
    }
    try {
        const registerMe = new Register({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            bmi: req.body.bmi,
            address: req.body.address,
            password: req.body.password
        });
        const token = await registerMe.generateAuthToken();

        // The res.cookie() function is used to set the cookie name to value.
        // The value parameter may be string or object converted to JSON
        // Syntax: res.cookie(name, value, [options])
        const data = await registerMe.save();

        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 50000000),   //in milliseconds 
            httpOnly: true,
            // secure: true
        }).redirect('http://localhost:8000/home');
        res.end();
        // middleware bcrypt() method will be implemented here before saving the data to database
        
        // res.status(201).render('gym-login');
        // res.send('You are registered to our website');
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/verifyLogin', async (req, res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await Register.findOne({ email: email })
        // comparing hash of entered password with the password-hash stored in database
        const isMatch = await bcrypt.compare(password, user.password);
        const token = await user.generateAuthToken();

        if (!isMatch) {
            res.send('Invalid login details!!');
        } else {
            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 50000000),   //in milliseconds 
                httpOnly: true,
                // secure: true
            }).redirect('http://localhost:8000/home');
            res.end();

            // res.render('home');
        }
    } catch (error) {
        console.log(error);
        res.status(400).send('invalid login details');
    }
})

app.listen(port, () => {
    console.log(`Server running at port number ${ port }`);
})