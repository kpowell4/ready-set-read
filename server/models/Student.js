import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    studentid: {type: String, unique: true},
    password: {type: String, required: true},
    grade: {type: String},
    status: {type:String},
})

const studentModel = mongoose.model('Student', studentSchema)
export {studentModel as Student}