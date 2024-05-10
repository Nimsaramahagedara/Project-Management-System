import mongoose from "mongoose";

const AssignmentMarksSchema = new mongoose.Schema({

    title: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'assignment'
    },
    studentId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users'
    },
    mark: {
        type: Number,
        default: 0
    },
}, { timestamps: true })

const AssignmentMarksModel = mongoose.model('assignmentMarks', AssignmentMarksSchema);
export default AssignmentMarksModel;


