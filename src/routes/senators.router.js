/*jshint esversion: 6 */

// API Documentation
// https://developers.google.com/civic-information/docs/v2/

// APIs Explorer
// https://developers.google.com/apis-explorer/#p/civicinfo/v2/civicinfo.representatives.representativeInfoByDivision?ocdId=ocd-division%252Fcountry%253Aus%252Fstate%253Amn&levels=administrativeArea1&recursive=true&roles=legislatorUpperBody&_h=2&resource=%257B%250A%257D&

/*
This route uses Google's civic API to gather senator information for the state of MN
*/

// requires
const express = require('express');
const router = express.Router();
// environment variables
require('dotenv').config();
// officialsFilter Module
const officialsFilter = require('../modules/officialsFilter.module');

// Google API Key brought in through environment variables
const apiKey = process.env.GOOGLE_API;

// google civic URI, filtering out MN state senators and their contact information.
const civicURI = 'https://www.googleapis.com/civicinfo/v2/representatives/ocd-division' + 
'%2Fcountry%3Aus%2Fstate%3Amn?levels=administrativeArea1&recursive=true&roles=legislatorUpperBody' +
'&fields=offices(name%2CofficialIndices)%2Cofficials(emails%2Cname%2Cparty%2Cphones%2CphotoUrl%2Curls)&key=';

// concatenate the URI with the API key
const civicRoute = civicURI + apiKey;

// may need to nest this inside another route
// get route for senators data
router.get(civicRoute, (request, response) => {
    console.log('in senators get API call');

    res.status(200).send(response);
}); // end get

// export
module.exports = router;