import mongoose from "mongoose";

const postdetailsSchema = new mongoose.Schema({
    username: { type: String, required: true },
    comment: { type: String },
    date: { type: String },
    selectedBook: { type: String }, // Include the selected book field
    status: { type: String, default: 'pending' } // Include a status field with a default value
});

const postdetailsModel = mongoose.model('PostDetails', postdetailsSchema); // Use postdetailsSchema

export { postdetailsModel as PostDetails };


