import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        required: true
    },
    researchArea: {
        type: String,
        enum: ['Machine Learning', 'Natural Language Processing', 'Intelligent Systems', 'Robotics'],
        required: true
    },
    specialization: {
        type: mongoose.Schema.ObjectId,
        ref: 'specialization',
        required: true
    },
    students: [
        {
            studentId: {
                type: mongoose.Schema.ObjectId,
                ref: 'users'
            }
        }
    ],
    supervisor: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
    },
    coSupervisor: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
    },
    // projectLeader: {
    //     firstName: {
    //         type: String
    //     },
    //     lastName: {
    //         type: String
    //     },
    //     regNo: {
    //         type: String
    //     }
    // }
}, { timestamps: true });

const RegisterTempModel = mongoose.model("ProjectGroup", groupSchema);

export default RegisterTempModel;
