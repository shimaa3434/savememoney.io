declare var require:any
var multer = require('multer')
declare var module:any

var storage = multer.memoryStorage({
    destination: (request, file, callback) => {
        callback(null, '')
    }
})
const PFPUploadMiddleware = multer({storage}).single('pfp');


module.exports = PFPUploadMiddleware;