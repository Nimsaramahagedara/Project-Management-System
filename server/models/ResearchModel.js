import mongoose from "mongoose";

const ResearchSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    students: [
        {
            studentId: {
                type: mongoose.Schema.ObjectId,
                ref: 'users'
            }
        }
    ],
    supervisor1: {
        type: String,
        required: true,
    },
    supervisor1: {
        type: String,
        required: true,
    },
    supervisor2: {
        type: String,
        required: true,
    },
    journalName: {
        type: String,
    },
    issnNumber: {
        type: String,
    },
    h5IndexLink: {
        type: String,
    },
    hIndexLink: {
        type: String,
    },
    scopusSiteLink: {
        type: String,
    },
    imageLinkOfAcceptanceLetter: {
        type: String,
    },
    status: {
        type: Boolean,
        default: 0,
    },

}, { timestamps: true });

const ResearchModel = mongoose.model("research", ResearchSchema);

export default ResearchModel;