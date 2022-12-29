import multer from "multer"

/*File storage */
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "public/assets")
    },
    filename: function(req,file,cb){
        cd(null, file.originalname)
    }
   
})
 export const upload = multer({storage:storage})

