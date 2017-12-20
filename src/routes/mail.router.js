/*jshint esversion: 6 */

// required modules
const express = require('express');
const router = express.Router();
const request = require('request');
// nodemailer module
const nodemailer = require('nodemailer');
// environment variables
require('dotenv').config();
// database pool
const pool = require('../modules/pool');
// secret key
const secretKey = process.env.SECRET;

// user credentials for node mailer - currently using my personal domain email
const contactCredentials = {
    username: process.env.EMAIL_UN,
    pw: process.env.EMAIL_PW
}; // end contactCredentials

// setup email configuration - currently using my personal
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: contactCredentials.username,
        pass: contactCredentials.pw
    } // end auth
}); // end transporter

// post route for sending emails to Senator 
// and saving the Constituent's contact information in the DB
router.post('/', (req, res) => {
    console.log('in mail / post');
    // captcha status
    let captchaStatus = {};

    const reCaptcha = req.body['g-recaptcha-response'];
    const ip = req.connection.remoteAddress;
    // req.connection.remoteAddress will provide IP address of connected user.
    const verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + reCaptcha + "&remoteip=" + ip;

    // if its blank or null the user has not selected the captcha, so return an error
    if (reCaptcha === undefined || reCaptcha === '' || reCaptcha === null) {
        return { responseCode: 1, responseDesc: 'Please select captcha' };
    } // end if
    
    // Google will respond with success or an error
    request(verificationUrl, function (error, response, body) {
        body = JSON.parse(body);
        // if captcha success is false or undefined
        if (body.success !== undefined && !body.success) {
            return res.status(500).json({ "responseCode": 1, "responseDesc": "Failed captcha verification" });
        } // end if
        // captcha success is true
        
        // Constituent's name
        const name = {
            first: req.body.firstName,
            last: req.body.lastName
        }; // end name
        // Constituent's email string
        const emailAddress = req.body.email;
        // message string
        const message = req.body.message;
        // subject string
        const subject = req.body.subject; // may want to make this static
        // Constituent's phone number string
        const phoneNumber = req.body.phone;
        // Constituent's mailing address object
        const mailAddress = {
            streetOne: req.body.streetOne,
            streetTwo: req.body.streetTwo,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip
        }; // end mailAddress
        // Senator's email address
        const senatorEmail = req.body.senatorEmail;

        // object to send
        const mailConfig = {
            from: contactCredentials.username,
            to: senatorEmail,
            subject: subject,
            html: '<p>' + message + '</p>'
        }; // end mailConfig


        /*
        need to setup DB route to add row with Constituent's data
    
        */


        // send message using the above information
        transporter.sendMail(mailConfig, function (err, info) {
            if (err) {
                console.log('sendMail error: ', err);
                res.sendStatus(500);
            } else {
                console.log('Message sent: ', info.messageId, info.response);
                res.sendStatus(200);
            } // end else
        }); // end message

    }); // end request
}); // end post

// export
module.exports = router;