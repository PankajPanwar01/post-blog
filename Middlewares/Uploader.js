const multer = require('multer')



const storage = multer.diskStorage({

    destination : (res,file,cb) =>{
        cb(null , "public/")
    },
    filename : (req,file, cb) =>{

        console.log("*********", file)

        req.body['filePath'] = Number(Date.now())+"_"+file.originalname
        cb(null , Number(Date.now())+"_"+file.originalname)
    }
})


const uploader = multer({storage : storage})

module.exports = uploader