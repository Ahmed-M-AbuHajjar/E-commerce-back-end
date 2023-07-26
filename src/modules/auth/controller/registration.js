// Importing necessary modules
import userModel from "../../../../DB/model/User.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { sendEmail } from "../../../services/email.js";
import { nanoid } from "nanoid";

// Defining a controller function for user registration
export const signUp =async (req, res) => {
  try {
    // Extracting user data from the request body
    const { userName, email, password, cPassword,role } = req.body;
  if (password == cPassword) {
    // Checking if the user exists in the database
    const foundedUser = await userModel.findOne({ email });
    if (foundedUser) {
      res.json({ message: "you're already register " });
    } else {
      // Hashing the password
        let hashed = bcrypt.hashSync(password, parseInt(process.env.saltRound));
        let user = new userModel({ userName, email, password: hashed,role })
        // Saving the user to the database
      let savedUser = await user.save();
      let token = jwt.sign({ id: savedUser._id }, process.env.jwtkey, { expiresIn: 60 });
      let refreshToken = jwt.sign({ id: savedUser._id }, process.env.jwtkey, { expiresIn: 60* 60 *7 });
      let message = `<a href="https://e-commerce-back-end-ahmed-m-abuhajjar.onrender.com/api/v1/auth/confirmEmail/${token}">please click here to verify your email</a>
     <br>
     <br>
     <a href="https://e-commerce-back-end-ahmed-m-abuhajjar.onrender.com/api/v1/auth/refreshToken/${refreshToken}">please click to refreshToken</a>
      `;
      let subject="confirm your mail"
      sendEmail(email,subject, message);
       res.json({ message: "added", savedUser });
    }
  } else {
    res.json({ message: "password should match cPassword " });
  }
  } catch (error) {
    res.json({message:'error',error})
  }
}


// Defining a controller function for user login
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Checking if the user exists in the database
const foundedUser = await userModel.findOne({ email });
if (foundedUser) {
  // Comparing the password with the hashed password in the database
   let matched = await bcrypt.compare(password, foundedUser.password);
 if (matched) {
   if (foundedUser.confirmEmail) {
    // Generating a token for authentication
         let token = jwt.sign({ isLogin: true, id: foundedUser._id }, process.env.jwtkey);
         res.status(202).json({ message: "welcome", foundedUser, token });
   } else {
       res.status(406).json({ message: "please confirm your email first" });
     }
     
   } else {
         res.status(401).json({ message: "password in-correct" });
   }
} else {
 res.status(404).json({ message: "unregistered account or unconfirmed email!" });
}
  } catch (error) {
    res.json({message:'error',error})
  }
};
// Defining a controller function for email confirmation
  export const confirmEmail = async(req, res) => {
    try {
      let { token } = req.params;
      // Verifying the token
    let decoded = jwt.verify(token, process.env.jwtkey);
    if (decoded) {
      // Checking if the user exists in the database and has not confirmed their email
      let user = await userModel.findOne({ _id: decoded.id, confirmEmail: false });
      if (user) {
        // Updating the user's profile to confirm their email
        await userModel.findByIdAndUpdate(decoded.id, { confirmEmail: true }, {new:true});
        res.redirect("https://ahmed-m-abuhajjar.github.io/E-commerce-front-end/#/EmailConfirmed");
      } else {
        res.redirect("https://ahmed-m-abuhajjar.github.io/E-commerce-front-end/#/home");
      }
    } else {
        res.json({ message: " invalid token" });
     }
    } catch (error) {
      res.redirect("https://ahmed-m-abuhajjar.github.io/E-commerce-front-end/#/TokenExpired")
    }
  };
// Defining a controller function for refreshing the token
  export const refreshToken = async(req, res) => {
    try {
      let { token } = req.params
      // Verifying the token
    let decoded = jwt.verify(token, process.env.jwtkey);
    if (!decoded || !decoded.id) {
      res.json({message:"invalid token or id"})
    } else {
      // Checking if the user exists in the database
      let user = await userModel.findById(decoded.id);
      if (!user) {
        // If the user does not exist, send an error message
        res.json({message:"user didn't register"})
      } else {
        if (user.confirmEmail) {
          // If the user has confirmed their email, redirect to the home page
          res.redirect("https://e-commerce-back-end-ahmed-m-abuhajjar.onrender.com/#/home")
        } else {
          // If the user has not confirmed their email, generate a new token, 
          // create a confirmation message, send it to the user, and redirect to the refresh token page
            let token = jwt.sign({ id: user._id }, process.env.jwtkey);
         let message = `<a href="https://e-commerce-back-end-ahmed-m-abuhajjar.onrender.com/api/v1/auth/confirmEmail/${token}">this is the second email</a>`;
         let subject="new confirmation mail"
         sendEmail(user.email,subject, message);
         res.redirect('https://e-commerce-back-end-ahmed-m-abuhajjar.onrender.com/#/RefreshToken');
        }
      }
    }
    } catch (error) {
      // If an error occurs, send an error message
     res.json({message:'error',error}) 
    }
  };
  // This function sends a code to the user's email for password reset
  export const sendCode = async (req, res) => {
    try {
      let { email } = req.body;
      // Find the user by email
    let user = await userModel.findOne({ email });
    if (!user) {
      // If the user does not exist, send an error message
      res.json({message:"user didn't register yes"})
    } else {
      // Generate a new OTP code, update the user's code in the database, 
      // create a message with the code, send it to the user, and send a success message
      let OTPCode = nanoid()
  
      await userModel.findByIdAndUpdate(user._id,{code:OTPCode})
        let message = `your OTPCODE is ${OTPCode}`;
        let subject="rest password code"
        sendEmail(user.email,subject, message);
        res.json({ message: "Done please check you email" });
  
    }
    } catch (error) {
      // If an error occurs, send an error message
      res.json({message:'error',error})
    }
  };
  
  // This function resets the user's password using a code sent to their email
  export const forgetPassword = async (req, res) => {
    try {
      let { code, email, password } = req.body;
      if (!code) {
        // If the code is invalid, send an error message
        res.json({ message: " code is not valid" });
      } else {
        // Find the user by email and code
        let user = await userModel.findOne({ email, code });
        if (!user) {
          // If the user or code is invalid, send an error message
          res.json({ message: "email or code is not valid" });
        } else {
          // Hash the new password, update the user's password and code in the database, and send a success message
          const hashPass = bcrypt.hashSync(password, parseInt(process.env.saltRound));
          let update = await userModel.findByIdAndUpdate(user._id, { code: null, password: hashPass }, { new: true });
          res.json({ message: "success", update });
        }
      }
    } catch (error) {
      // If an error occurs, send an error message
          res.json({ message: " error", error });
    }
  };