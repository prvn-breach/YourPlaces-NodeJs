const HttpError  = require('../models/http-error');
// const { validationResult } = require('express-validator');
const User = require('../models/user');
const validator = require('../helpers/validate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret_key = process.env.JWT_KEY;

const createUsers = (req, res, next) => {};

const getUsers = async (req, res, next) => {  
    await User.find({}, "-password").exec().then((response) => {
        res.status('201')
            .json({
                'message': 'Successfully fetched users',
                'data': response.map(user => user.toObject({ getters: true }))
            });
    }).catch((err) => {
        return next(new HttpError('Fetching users failed, please try again', 500));
    });
};

const signUp = async (req, res, next) => {

    const validationRules = {
        'name': 'required|string',
        'email': 'required|email',
        'password': 'required|integer|min:6'
    };

    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        }
    });

    const { name, email, password } = req.body;

    let existedUser;
    try {
        existedUser = await User.findOne({ email: email });
    } catch(err) {
        return next(new HttpError('Signing up failed. Please try again later.', 500));
    }

    if(existedUser) {
        const error = new HttpError(
            'User already exists. Please login instead', 409
        );
        return next(error);
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch(err) {
        return next(
            new HttpError('Signing up failed. Please try again later.', 500)
        );
    }

    const newUserDetails = new User({
        name,
        email,
        password: hashedPassword,
        image: req.file.path,
        places: []
    });

    const createdUserDetails = await newUserDetails.save().catch((err) => {
        return res.status(500).json({
            success: false,
            message: err['message'],
            error: err
        });
    });

    let token;
    try {
        token = jwt.sign({
            userId: createdUserDetails['_id'],
            email: createdUserDetails['email']
        }, secret_key, {
            expiresIn: '1h'
        });
    } catch(err) {
        return next(
            new HttpError('Signing up failed. Please try again later.', 500)
        );
    }

    res.status(201).json({
        userId: createdUserDetails['_id'],
        email: createdUserDetails['email'],
        token: token
    });
};

const login = async (req, res, next) => {
    const validationRules = {
        'email': 'required|email',
        'password': 'required|min:5|integer'
    }

    validator(req.body, validationRules, {}, (err, status) => {
        if (!status && err['errors']['email']) {
            res.status(412).send({
                success: false,
                message: err['errors']['email'],
                data: err
            });
        } else if(!status && err['errors']['password']) {
            res.status(412).send({
                success: false,
                message: err['errors']['password'],
                data: err
            });
        } else if(!status){
            res.status(412).send({
                success: false,
                message: 'Validation failed. Please provide valid inputs.',
                data: err
            });
        }
    });

    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch(err) {
        const error = new HttpError(
            'Loggin in failed, please try again later', 500
        );
        return next(error);
    }

    if(!existingUser) {
        return res.status(404).send({
            success: false,
            message: 'Invalid credentials, could not log you in.'
        });
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch(err) {
        const error = new HttpError(
            'Could not log you in. please check your credentails and try again!', 500
        );
        return next(error);
    }

    if(!isValidPassword) {
        const error = new HttpError(
            'Incorrect password!',
            412
        );
        return next(error);
    }

    let token;
    try {
        token = jwt.sign({
            userId: existingUser['_id'],
            email: existingUser['email']
        }, secret_key, {
            expiresIn: '1h'
        });
    } catch(err) {
        return next(
            new HttpError('Signing up failed. Please try again later.', 500)
        );
    }

    res.status(201).json({
        userId: existingUser['_id'],
        email: existingUser['email'],
        token: token
    });
};

const logout = (req, res, next) => {};

exports.createUsers = createUsers;
exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;
exports.logout = logout;