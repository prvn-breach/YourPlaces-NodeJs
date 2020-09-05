const axios = require('axios');
const HttpError = require('../models/http-error');

const API_KEY = process.env.GOOGLE_API_KEY;

async function getCoordsForAddress(address) {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);
    const data = response.data;

    if (!data || data.status === "ZERO_RESULTS") {
        throw new HttpError('Please provide valid address.', 422);
    }
    
    // const coordinates =  data.results[0].geometry.location;
    // return coordinates;
    return {
        lat: 48.8583701,
        lng: 2.2922926
    };
}

module.exports = getCoordsForAddress;