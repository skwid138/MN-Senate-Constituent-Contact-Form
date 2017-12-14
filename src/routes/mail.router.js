/*jshint esversion: 6 */

// requires
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

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

    // name
    const name = {
        first : req.body.firstName,
        last : req.body.lastName
    }; // end name
    // email string
    const emailAddress = req.body.email;
    // message string
    const message = req.body.message;
    // subject string
    const subject = req.body.subject; // may want to make this static
    // phone number string
    const phoneNumber = req.body.phoneNumber;
    // mailing address object
    const mailAddress = {
        streetOne : req.body.streetOne,
        streetTwo : req.body.streetTwo,
        city : req.body.city,
        state : req.body.state,
        zip : req.body.zip
    }; // end mailAddress
    const senator = req.body.senator;

    // object to send
    const mailConfig = {
        from: contactCredentials.username,
        to: senator,
        subject: subject,
        html: '<p>' + message + '</p>'
    }; // end mailConfig

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
}); // end post

// export
module.exports = router;