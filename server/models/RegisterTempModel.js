import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    batch: {
        type: String,
        enum: ['Regular', 'June'],
        required: true
    },
    specialization: {
        type: String,
        enum: ['IT', 'SE', 'IS', 'CS', 'DS', 'CSNE'],
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
        required: true
    },
    researchGroup: {
        type: String,
        enum: ['Machine Learning', 'Natural Language Processing', 'Intelligent Systems', 'Robotics'],
        required: true
    },
    students: [studentSchema],
    supervisor: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
    },
    coSupervisors: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
    }
    // specId: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'specialization'
    // }
}, { timestamps: true });

RegisterTempSchema.pre('save', function (next) {
    if (this.students.length > 0) {
        this.projectLeader = {
            name: this.students[0].name,
            registrationNumber: this.students[0].registrationNumber
        };
    }
    next();
});

const RegisterTempModel = mongoose.model("registerTemp", RegisterTempSchema);

export default RegisterTempModel;
