const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const checkAuth = require('../middleware/check_auth');

const placesController = require('../controllers/places-controller');
const fileUpload = require('../middleware/file_upload');

router.get('/find-by-id', placesController.getPlaceById);

router.get('/find-by-user', placesController.getPlaceByUserId);

//Authorization middleware
router.use(checkAuth);

router.post('/', fileUpload.single('image'), placesController.createPlace);

router.post('/update',[
    check('title').not().isEmpty().withMessage('title field is required'),
    check('description').isLength({ min: 5 }).withMessage('must be at least 5 chars long')
], placesController.updatePlace);

router.post('/delete', placesController.deletePlace);

module.exports = router;