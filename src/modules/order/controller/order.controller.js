import OrderModel from "../../../../DB/model/Order.model.js";
import { sendEmail } from "../../../services/email.js";
// This function creates a new order for a user and includes the user's cart and total price
export const createOrder = async (req, res) => {

    try {
        let { createdBy, cart, totalPrice,email } = req.body;
        // Check if an order already exists for the given cart
        let order = await OrderModel.findOne({ cart });

        if (!order) {
            // If no order exists, create a new order object, save it to the database, and send a success message with the new order object
            let addedOrder = new OrderModel({ createdBy, cart, totalPrice })
            await addedOrder.save();
            let message = `Thank you for completing your Purchase<br>
            please head to the nearest branch to receive your car
      `;
      let subject="Car Order Completed"
      sendEmail(email,subject, message);
            res.status(201).json({ message: 'added', addedOrder })
        } else {
            // If an order already exists for the given cart, send an error message
            res.status(401).json({ message: 'Order already Exist' });
        }
    }
    catch (error) {
        // If an error occurs, send an error message
        res.json({ message: 'error', error })
    }

};
// This function gets all orders in the database and includes details for each cart and the user who created the order
export const getOrders = async (req,res) => {
    try {
        // Find all orders in the database and populate the cart and createdBy fields
        // with additional details such as the car brand and name and the user's email
        let orders = await OrderModel.find().populate({path: 'cart',
        populate: {
          path: 'cars.carId',
          select:'brand name'
        }}).populate({path:'createdBy',select:'email'});
        // Send a success message with the array of order objects
        res.status(200).json({message:'done',orders})
    } catch (error) {
        // If an error occurs, send an error message
        res.json({message:'error',error})
    }
};

export const deleteOrder = async (req,res) => {
    try {
        // Find the order by ID, delete the order object from the database, and send a success message
        const {id} = req.params;
        const findOrder = await OrderModel.findById(id)
        console.log(findOrder);
         if(findOrder){
           
           await OrderModel.findByIdAndDelete(findOrder._id)
            res.status(200).json({message:'order deleted successfully'});
        } else {
            // If the order is not found, send an error message
            res.status(404).json({message:'no order found with this id'})
         }
      
    } catch (error) {
        // If an error occurs, send an error message
        res.json({message:'error',error})
    }
}