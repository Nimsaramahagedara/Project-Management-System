import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
    assId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'assignment'
    },
    stdId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users'
    },
    submission: {
        type: String,
        required:true
    },
    file:{
        type:String,
    },
    remark: {
        type: String,
        required:true
    },
    marks:{
        type:String,
        default:'Pending'
    }
},{timestamps:true})

const SubmissionModel = mongoose.model('submission', SubmissionSchema);
export default SubmissionModel;