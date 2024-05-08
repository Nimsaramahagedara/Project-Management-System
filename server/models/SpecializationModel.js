import mongoose from 'mongoose';

const SpecSchema = new mongoose.Schema({
    specialization:{
        type:String,
        required:true
    },
    year: {
        type: Number,
        required: true
    },
    semester: {
        type:Number,
        required: true
    },
    ownedBy:{
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
}, { timestamps: true });


const SpecializationModel = mongoose.model("specialization", SpecSchema);

export default SpecializationModel;