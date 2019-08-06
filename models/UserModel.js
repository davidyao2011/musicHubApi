import mongoose from 'mongoose';

// use Schema from mongoose Schema constructor
const Schema = mongoose.Schema;

// create userSchema from Schema constructor
export const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});