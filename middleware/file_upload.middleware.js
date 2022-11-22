const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')

const storage = new GridFsStorage({
    url: "mongodb://localhost/metadalogiya",
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useNewUrlParser:true
    },
    file: (req, file) => {
        const match = ["application/pdf"]

        if(match.indexOf(file.mimetype) === -1){
            const filename = `${Date.now()}-any-name`
            return filename
        }
        return {
            bucketName: "files",
            filename: `${Date.now()}-any-name`
        }
    }
})

module.exports = multer({ storage })