// Importing necessary modules
import multer from 'multer';
// Exporting a validationTypes object containing allowed image types
export const validationTypes = {
    image:['image/png','image/jpg','image/jpeg']
}
// Creating a middleware function called HME to handle multer errors
export const HME = (err,req,res,next)=> {
    if(err){
        res.status(400).json({message:'multer error',err})
    } else {
        next()
    }
}
// Exporting a function called myMulter that returns the configured multer object
export const myMulter = (acceptType) => {

 
// Creating a new disk storage object for multer
 const storage = multer.diskStorage({
      
    })
    // Creating a file filter function for multer that only allows certain file types
    const fileFilter = (req,file,cb)=>{
        if(acceptType.includes(file.mimetype)){
            cb(null,true);
        } else {
            cb(null,false);
        }
    }
    // Creating a new multer object with the disk storage and file filter functions
    const upload = multer({ dest:'uploads', fileFilter,storage});

    return upload
};