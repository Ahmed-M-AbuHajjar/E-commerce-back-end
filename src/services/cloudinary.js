// Importing necessary modules
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
// Getting the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url))
// Loading the environment variables from the .env file
dotenv.config({ path: path.join(__dirname, '../../config/.env') })
// Importing the cloudinary module
import cloudinary from 'cloudinary'
// Configuring the cloudinary module with the environment variables
cloudinary.v2.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret,
    secure: true
});
// Exporting the configured cloudinary module for use in other modules
export default cloudinary.v2