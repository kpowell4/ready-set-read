import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {type: String},
    author: {type: String, required: true},
    category: {type: String},
    level: {type: String},
    imageUrl: {type:String, required: true},
    description: {type:String}
})

const bookModel = mongoose.model('Book', bookSchema)
export {bookModel as Book}