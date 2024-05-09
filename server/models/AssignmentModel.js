import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema({
    supId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users'
    },
    title:{
        type:String,
        required:true
    },
    description: {
        type: String,
        required:true
    }
},{timestamps:true})

const AssignmentModel = mongoose.model('assignment', AssignmentSchema);
export default AssignmentModel;