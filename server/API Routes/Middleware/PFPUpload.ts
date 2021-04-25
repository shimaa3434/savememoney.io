
var multer = require('multer')


var storage = multer.memoryStorage({
    destination: (request, file, callback) => {
        callback(null, '')
    }
})
const PFPUploadMiddleware = multer({storage}).single('pfp');


module.exports = PFPUploadMiddleware;