import AssignmentModel from '../models/AssignmentModel.js';

// Create operation
export const createAssignment = async (req, res) => {
    const id = req.loggedInId;
    const data = {
        supId : id,
        title : req.body.title,
        description : req.body.description
    }
    try {
        const assignment = await AssignmentModel.create(data);
        return res.status(201).json(assignment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Read operation - Get all Assignments
export const getAllAssignments = async (req, res) => {
    try {
        const assignment = await AssignmentModel.find()
        res.status(200).json(assignment);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Read operation - Get Assignment by ID
export const getAssignmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const assignment = await AssignmentModel.findById(id);
        if (!assignment) {
            return res.status(404).json({ error: "assignment not found" });
        }
        res.status(200).json(assignment);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Update operation - Update Assignment by ID
export const updateAssignment = async (req, res) => {
    const { id } = req.params;
    try {
        const assignment = await AssignmentModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!assignment) {
            return res.status(404).json({ error: "assignment not found" });
        }
        res.status(200).json(assignment);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Delete operation - Delete Assignment by ID
export const deleteAssignment = async (req, res) => {
    const { id } = req.params;
    try {
        const assignment = await AssignmentModel.findByIdAndDelete(id);
        if (!assignment) {
            return res.status(404).json({ error: "assignment not found" });
        }
        res.status(200).json(assignment);
    } catch (error) {
        res.status(500).json(error);
    }
};
