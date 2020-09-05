const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

//This converts data to json for any incoming requests body
app.use(bodyParser.json());

//seperate middleware for files
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

//headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

//places middleware
app.use('/api/places', placesRoutes);

//users middlware
app.use('/api/users', usersRoutes);

//throw error when request unknown route
app.use((req, res, next) => {
    const error = new HttpError('Could not find route.', 404);
    throw error;
});

//throw an error in application
app.use((error, req, res, next) => {
    if(req.file) {
        fs.unlink(req.file.path, (err) => {
            console.log(err);
        });
    }
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
       .json({ message: error.message || 'An Unknown error occured.'});
});

//connected to mongo DB to mern (database)
mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8ugy9.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }
).then(() => {
    console.log("CONNECTING TO MONGO!");
}).catch(err => {
    console.log(err);
})

app.listen(process.env.PORT || 5000);