var multer = require('multer')

var storage = multer.memoryStorage({
    destination: (request, file, callback) => {
        callback(null, '')
    }
})
var PostImageUploadMiddleware = multer({storage}).single('image');

module.exports = PostImageUploadMiddleware;