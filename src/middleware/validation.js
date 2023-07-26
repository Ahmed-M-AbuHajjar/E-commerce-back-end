// Defining an array of data methods
const dataMethod = ['body', 'params', 'query', 'headers']

// Defining a middleware function called validation that takes in a Joi schema as an argument
// Exporting the validation middleware function for use in other modules.
export const validation = (Schema) => {

    return (req, res, next) => {
        // Validating each data method against the Joi schema and storing the result in an array
        const validationArr = []
        dataMethod.forEach(key => {
            if (Schema[key]) {
                const validationResult = Schema[key].validate(req[key], { abortEarly: false })
                if (validationResult?.error) {
                    validationArr.push(validationResult.error.details)
                }
            }
        })
        // Handling validation errors and sending an error response
        if (validationArr.length) {
            res.status(400).json({ message: "Validation error", validationArr })
        } else {
            // Calling the next function if there are no validation errors
            next()
        }
    }
}