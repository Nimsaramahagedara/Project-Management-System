import SubmissionModel from '../models/AsSubmissionModel.js';

// Create operation
export const createSubmission = async (req, res) => {
    const id = req.loggedInId;
    const data = {
        stdId : id,
        assId : req.body.assId,
        submission : req.body.submission,
        remark : req.body.remark
    }
    console.log(data);
    try {
        const submission = await SubmissionModel.create(data);
        return res.status(201).json(submission);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAllSubmissions = async (req, res) => {
    try {
        const submission = await SubmissionModel.find()
        .populate('assId')
        .populate('stdId');
        res.status(200).json(submission)
    } catch (error) {
        res.status(500).json(error);
    }
};


// Read operation - Get submission by ID
export const getSubmissionById = async (req, res) => {
    const { id } = req.params;
    try {
        const submission = await SubmissionModel.findById(id)
        .populate('assId')
        .populate('stdId');
        if (!submission) {
            return res.status(404).json({ error: "submission not found" });
        }
        res.status(200).json(submission);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getSubmissionByStdId = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const submission = await SubmissionModel.find({stdId : id})
        .populate('assId')
        .populate('stdId');

        if (!submission) {
            return res.status(404).json({ error: "submission not found" });
        }
        res.status(200).json(submission);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getSubmissionByAssId = async (req, res) => {
    const { assId } = req.params;
    try {
        const submission = await SubmissionModel.find({assId})
        .populate('assId')
        .populate('stdId');
        if (!submission) {
            return res.status(404).json({ error: "submission not found" });
        }
        res.status(200).json(submission);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Update operation - Update submission by ID
export const updateSubmission = async (req, res) => {
    const { id } = req.params;
    try {
        const submission = await SubmissionModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!submission) {
            return res.status(404).json({ error: "submission not found" });
        }
        res.status(200).json(submission);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Delete operation - Delete submission by ID
export const deleteSubmission = async (req, res) => {
    const { id } = req.params;
    try {
        const submission = await SubmissionModel.findByIdAndDelete(id);
        if (!submission) {
            return res.status(404).json({ error: "submission not found" });
        }
        res.status(200).json(submission);
    } catch (error) {
        res.status(500).json(error);
    }
};
