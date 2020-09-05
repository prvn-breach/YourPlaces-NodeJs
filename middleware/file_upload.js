const multer = require("multer");

const MIME_TYPE_MAP = {
    "image/png" : "png",
    "image/jpg" : "jpg",
    "image/jpeg" : "jpeg"
};

const fileUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/images");
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, Math.random() + '.' + ext);
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        var error = isValid ? null : new Error('Invalid mimetype!');
        cb(error, isValid);
    }
});

module.exports = fileUpload;