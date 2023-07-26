// Importing necessary modules
import Stripe from "stripe";
// Defining an asynchronous function called payment that takes an object as an argument with various properties
 async function payment({ 
    stripe = new Stripe(process.env.STRIPE_KEY),
    payment_method_types=['card'],
    mode='payment',
    customer_email,
    metadata = {},
    cancel_url=process.env.CANCEL_URL,
    success_url=process.env.SUCCESS_URL,
    discounts= [],
    line_items = [],
} = {}){
// Creating a new Stripe checkout session with the provided properties and storing the session object in a variable
    const session = await stripe.checkout.sessions.create({

        payment_method_types,
        mode,
        customer_email,
        metadata,
        cancel_url,
        success_url,
        discounts,
        line_items
    })
// Returning the created session object
    return session
}
// Exporting the payment function for use in other modules
export default payment