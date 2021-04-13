var multer = require('multer')

const storage = multer.memoryStorage({
    destination: (request, file, callback) => {
        callback(null, '')
    }
})
const Upload = multer({storage}).single('pfp');


module.exports = Upload;