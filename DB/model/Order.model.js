// Importing necessary modules
import { Schema, model, Types } from "mongoose";

// Creating a new schema for a order with various properties
const orderSchema = new Schema({


    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'CreatedBy is required'],
    },
    cart:{
        type: Types.ObjectId,
        ref:'Cart',
        required: [true, 'Cart is required'],
        unique:true,
    },
    totalPrice:{
        type:String,
        required:[true, 'total price is required']
    },
}, {
    timestamps: true
})


const OrderModel = model('Order', orderSchema)
// Exporting the OrderModel for use in other modules.
export default OrderModel