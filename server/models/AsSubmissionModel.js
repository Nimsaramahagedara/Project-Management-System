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
    remark: {
        type: String,
        required:true
    }
},{timestamps:true})

const SubmissionModel = mongoose.model('submission', SubmissionSchema);
export default SubmissionModel;