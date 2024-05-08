import GroupModel from '../models/GroupModel.js';

// Create operation
export const createGroup = async (req, res) => {
    try {
        const Group = await GroupModel.create(req.body);
        return res.status(201).json(Group);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Read operation - Get all Groups
export const getAllGroups = async (req, res) => {
    try {
        const Groups = await GroupModel.find()
            .populate('specialization')
            .populate('coSupervisor')
            .populate('supervisor')
            .populate('students.studentId');
        res.status(200).json(Groups);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Read operation - Get Group by ID
export const getGroupById = async (req, res) => {
    const { id } = req.params;
    try {
        const Group = await GroupModel.findById(id);
        if (!Group) {
            return res.status(404).json({ error: "Group not found" });
        }
        res.status(200).json(Group);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Update operation - Update Group by ID
export const updateGroup = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedGroup = await GroupModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedGroup) {
            return res.status(404).json({ error: "Group not found" });
        }
        res.status(200).json(updatedGroup);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Delete operation - Delete Group by ID
export const deleteGroup = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedGroup = await GroupModel.findByIdAndDelete(id);
        if (!deletedGroup) {
            return res.status(404).json({ error: "Group not found" });
        }
        res.status(200).json(deletedGroup);
    } catch (error) {
        res.status(500).json(error);
    }
};
