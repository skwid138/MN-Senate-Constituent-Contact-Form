/*jshint esversion: 6 */

/*
This module takes a response from Google's civic API and filters it
*/

/* 
response is an object with the following properties
divisions - this has a property for each district with an object as a value
offices - This appears to be each seat and it's corresponding district
officials - an array of objects - this has a name property with social media and contact information for each representative
*/

const filterSenators = (apiResponse) => {

    // for office in apiResponse.data.offices
    // office.officialIndicies[0] - this is the index of 
    // the corresponding senator in apiResponse.data.officials


}; // end filterSenators

module.exports = filterSenators;

