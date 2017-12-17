/*jshint esversion: 6 */

// environment variables
require('dotenv').config();

/*
This module uses Google's reCaptcha API
*/

// passed in 'req.body['g-recaptcha-response']' as recaptcha
// g-recaptcha-response is the key that browser will generate upon form submit.
// req.connection.remoteAddress as ip
const captchaStatus = (reCaptcha, ip) => {

    // secret key
    const secretKey = process.env.SECRET;
    // req.connection.remoteAddress will provide IP address of connected user.
    const verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + reCaptcha + "&remoteip=" + ip;

    // if its blank or null the user has not selected the captcha, so return an error
    if (reCaptcha === undefined || reCaptcha === '' || reCaptcha === null) {
        return { "responseCode": 1, "responseDesc": "Please select captcha" };
    } // end if

    

    // Google will respond with success or error scenario.
    request(verificationUrl, function (error, response, body) {
        body = JSON.parse(body);
        // if captcha success is false or undefined
        if (body.success !== undefined && !body.success) {
            return { "responseCode": 1, "responseDesc": "Failed captcha verification" };
        } // end if
        // captcha success is true
        return{ "responseCode": 0, "responseDesc": "Success" };
    }); // end request
}; // end captchaStatus


// export
module.exports = captchaStatus;