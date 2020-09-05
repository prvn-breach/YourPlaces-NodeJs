const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: true },
    address: { type: String, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    location: {
        lat: { type: String, required: true },
        lng: { type: String, required: true }
    }
});

module.exports = mongoose.model('Place', placeSchema);

