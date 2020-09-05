const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const Place = require('../models/place');
const User = require('../models/user');
const mongoose = require('mongoose');
const validator = require('../helpers/validate');
const fs = require('fs');

const getCoordsForAddress = require('../util/location');

const getPlaceById = async (req, res, next) => {
    const placeId = req.query.pid;
    let place_data;
    try {
        place_data = await Place.findOne({ _id: placeId }).exec();
    } catch(err) {
        const error = new HttpError('Oops! Something Went Wrong.', 500);
        return next(error);
    }

    res.json({
        message: "Successfully fetched places.",
        data: place_data
    });
};

const getPlaceByUserId = async (req, res, next) => {
    const userId = req.query.uid;

    let userWithPlaces;
    try {
        userWithPlaces = await User.findById(userId).populate('places');
    } catch(err) {
        const error = new HttpError('Oops! Something Went Wrong.', 500);
        return next(error);
    }

    if(!userWithPlaces || userWithPlaces.places.length === 0) {
        return next(new HttpError('Could find places by provided user id', 404));
    }

    res.json({
        message: "Successfully fetched places.",
        places: userWithPlaces.places.map(place => place.toObject({ getters: true }))
    });
};

const createPlace = async (req, res, next) => {
    const validationRules = {
        'title': 'required|string',
        'description': 'required|min:5'
    }

    validator(req.body, validationRules, {}, (err, status) => {
        if(!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed. Please provide valid inputs.',
                data: err["errors"]
            });
        }
    });

    const { title, description, address } = req.body;
    const { userId } = req.userData;

    let coordinates;

    try {
        coordinates = await getCoordsForAddress(address);
    } catch(error) {
        return next(error);
    }

    const createdPlace = new Place({
        title,
        description,
        image: req.file.path,
        location: coordinates,
        address,
        creator: userId
    });

    let user;

    try {
        user = await User.findById(userId);
    } catch(error) {
        return next(new HttpError('Creating place failed.', 500));
    }

    if(!user) {
        const error = new HttpError('Could not find user by provided user id', 404);
        return next(error);
    }
    
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({ session: sess });
        user.places.push(createdPlace);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch(err) {
        return res.status(500).send({error: err});
    }

    res.status(201).json({ 
        message: 'Successfully created place.',
        data: createdPlace
    });
};

const updatePlace = async (req, res, next) => {
    const validation_errors = validationResult(req);
    if (!validation_errors.isEmpty()) {
        return res.status(400).json({ message: 'Invalid inputs passed. Please check your data.', errors: validation_errors.array()});
    }
    
    const { id, title, description } = req.body;

    let existedPlace;

    try {
        existedPlace = await Place.findOne({ _id: id });
    } catch(err) {
        const error = new HttpError('Could not find place by provided placeId', 404);
        return next(error);
    }
    
    if(req['userData']['userId'] !== existedPlace['creator'].toString()) {
        const error = new HttpError('Permission Denied', 401);
        return next(error);
    }
    
    try {
        existedPlace.title = title;
        existedPlace.description = description;
        existedPlace.save(); // update title and description
    } catch(err) {
        const error = new HttpError('Oops! Something went wrong. Failed to update', 500);
        return next(error);
    }

    res.status(201).json({ message: "Successfully Updated.", data: existedPlace });
};

const deletePlace = async (req, res, next) => {
    const id = req.body.id;
    
    const place = await Place.findById(id).populate('creator').catch((err) => {
        return next(new HttpError('Oops! Something went wrong.', 500));
    });

    if(!place) {
        return next(new HttpError('Could not find place by provided place id', 404));
    }

    if(req['userData']['userId'] !== place['creator']['_id'].toString()) {
        const error = new HttpError('Permission Denied', 401);
        return next(error);
    }

    const imagePath = place.image;

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({ session: sess });
        place.creator.places.pull(place);
        await place.creator.save({ session: sess });
        sess.commitTransaction();
    } catch(err) {
        return next(new HttpError('Oops! Something went wrong. Unable to delete place', 500));
    }

    fs.unlink(imagePath, err => {
        console.log(err);
    })

    res.json({
        message: "Successfully Deleted place.",
        data: []
    });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId =  getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;