/*jshint esversion: 6 */

/*
This module takes a response from Google's civic API
filters it, so the senator objects will now have their district as well
returns an array of senator objects including which district they represent
*/

const filterSenators = (apiResponse) => {
    // empty array to hold new objects
    const sortedArray = [];

    // for each district create an object with the 
    // district name and senator of that district
    // push the newly created object into an array
    // return the new array of objects
    apiResponse.offices.forEach((district) => {
        // create a new object
        let senator = {
            // officialIndices is a number for the index of the corresponding senator in .officials
            senator: apiResponse.officials[district.officialIndices[0]],
            district: Number(district.name.slice(26))
        }; // end senator
        sortedArray.push(senator);
    }); // end forEach

    return sortedArray;
}; // end filterSenators

module.exports = filterSenators;