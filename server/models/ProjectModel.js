import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
    },
    supervisor: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
    },
    specId: {
        type: mongoose.Schema.ObjectId,
        ref: 'specialization'
    }
}, { timestamps: true });


const ProjectModel = mongoose.model("projects", ProjectSchema);

export default ProjectModel;