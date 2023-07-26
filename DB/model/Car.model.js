// Importing necessary modules
import { Schema, model } from "mongoose";

// Creating a new schema for a car with various properties
const carSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Car name is required'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char']

    },
    price: {
        type: String,
        required: [true, 'Car price is required'],
    },
    brand:{
        type:String,
        required: [true, 'Car brand is required']  
    },
    color: {
        type: String,
        required:[true, 'Car color is required']
    },
    transmission: {
        type: String,
        enum: ['Manual', 'Automatic'],
        required:[true, 'Car transmission is required']
    },
    engineSize: {
        type: String,
        required:[true, 'Engine size is required']
    },
    horsePower: {
        type: String,
        required:[true, 'Engine horsePower is required']
    },
    seats: {
        type: String,
        required:[true, 'Engine horsePower is required']
    },
    maxSpeed: {
        type: String,
        required:[true, 'Engine horsePower is required']
    },
    airBags: {
        type: String,
        required:[true, 'Engine horsePower is required']
    },
    acceleration: {
        type: String,
        required:[true, 'Engine horsePower is required']
    },
    type: {
        type: String,
        required:[true, 'Engine horsePower is required']
    },
    image: {
        type:Array,
        required:[true,'Car images are required']
    },
}, {
    timestamps: true
})

const CarModel = model('Car', carSchema)
// Exporting the CarModel for use in other modules.
export default CarModel