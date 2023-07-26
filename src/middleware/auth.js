// Importing necessary modules
import jwt from 'jsonwebtoken'
import userModel from '../../DB/model/User.model.js';
// Defining a middleware function called auth that takes in a request, response, and next function as arguments
// Exporting the auth middleware function for use in other modules.
export const auth = () => {
    return async (req, res, next) => {
        try {
            console.log({ bb: req.body });
            // Getting the authorization header from the request
            const { authorization } = req.headers
            console.log({ authorization });
            if (!authorization?.startsWith(process.env.BearerKey)) {
                res.status(400).json({ message: "In-valid Bearer key" })
            } else {
                const token = authorization.split(process.env.BearerKey)[1]
                // Verifying the token using the provided token signature
                const decoded = jwt.verify(token, process.env.tokenSignature)
                if (!decoded?.id || !decoded?.isLoggedIn) {
                    res.status(400).json({ message: "In-valid token payload " })
                } else {
                    const user = await userModel.findById(decoded.id).select('email userName role')
                    if (!user) {
                        res.status(404).json({ message: "Not register user" })
                    } else {
                        // Setting the user object on the request and calling the next function
                        req.user = user
                        next()

                    }
                }
            }
            // Handling errors and sending an error response
        } catch (error) {
            res.status(500).json({ message: "catch error", error })

        }


    }
}