const express = require('express');
// const { check } = require('express-validator');

const router = express.Router();
// const checkAuth = require('../middleware/check_auth');

const usersController = require('../controllers/users-controller');
const fileUpload = require('../middleware/file_upload');

router.get('/', usersController.getUsers);

router.post('/signup', fileUpload.single('image'), usersController.signUp);

router.post('/login', usersController.login);

//Authorization middleware
// router.use(checkAuth);

router.post('/create', usersController.createUsers);

router.post('/logout', usersController.logout);

module.exports = router;