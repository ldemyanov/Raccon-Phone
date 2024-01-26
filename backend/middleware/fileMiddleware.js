const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'images/');
    },
    filename(req, file, cb) {
        const name = `image${Date.now()}.png`
        cb(null, name);
    }
});

const types = ['image/png'];

const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({fileFilter, storage})