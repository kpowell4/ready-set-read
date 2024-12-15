import mongoose from "mongoose";

const helpSchema = new mongoose.Schema({
    username: {type: String, required: true},
    comment: {type: String},
    
})

const helpModel = mongoose.model('Help', helpSchema)
export {helpModel as Help}