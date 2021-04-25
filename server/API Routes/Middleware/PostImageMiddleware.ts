declare var require:any
var multer = require('multer')
declare var module:any

var storage = multer.memoryStorage({
    destination: (request, file, callback) => {
        callback(null, '')
    }
})
var PostImageUploadMiddleware = multer({storage}).single('image');

module.exports = PostImageUploadMiddleware;