import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    username: {type: String, required: true},
    comment: {type: String},
    date: {type: String},
   

    
})

const postModel = mongoose.model('Post', postSchema)
export {postModel as Post}