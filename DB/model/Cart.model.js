// Importing necessary modules
import { Schema, model, Types } from "mongoose";

// Creating a new schema for a cart with various properties
const cartSchema = new Schema({


    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'CreatedBy is required'],
        unique: true,
    },
    cars: {
        type: [
            {
                carId: {
                    type: Types.ObjectId,
                    ref: 'Car',
                    required: [true, 'CarId is required'],
                },
                quantity: {
                    type: Number,
                    default: 1
                },
            },
        ]
    },
}, {
    timestamps: true
})


const CartModel = model('Cart', cartSchema)
// Exporting the CartModel for use in other modules.
export default CartModel