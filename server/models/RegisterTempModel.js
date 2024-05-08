import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    regNo: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        enum: ['Regular', 'June'],
        required: true
    }
});

const RegisterTempSchema = new mongoose.Schema({
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
    students: [studentSchema],
    supervisor: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
    },
    coSupervisor: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
    },
    projectLeader: { 
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        regNo: {
            type: String
        }
    }
}, { timestamps: true });

RegisterTempSchema.pre('save', function (next) {
    if (this.students.length > 0) {
        this.projectLeader = {
            firstName: this.students[0].firstName,
            lastName: this.students[0].lastName,
            regNo: this.students[0].regNo
        };
    }
    next();
});

const RegisterTempModel = mongoose.model("registerTemp", RegisterTempSchema);

export default RegisterTempModel;
