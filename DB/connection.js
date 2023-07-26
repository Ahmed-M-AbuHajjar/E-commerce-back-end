// importing mongoose library
import mongoose from 'mongoose'
// setting up the Database connection function
const connectDB  = async ()=>{
    return await mongoose.connect(process.env.DBURI)
    .then(res=>console.log(`DB Connected successfully on .........${process.env.DBURI} `))
    .catch(err=>console.log(` Fail to connect  DB.........${err} `))
}
// exporting the database connection function
export default connectDB;