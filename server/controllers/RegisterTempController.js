import RegisterTempModel from '../models/RegisterTempModel.js';

// Create operation
export const createTempGroup = async (req, res) => {
    try {
        const tempGroup = await RegisterTempModel.create(req.body);
        return res.status(201).json(tempGroup);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Read operation - Get all tempGroups
export const getAllTempGroups = async (req, res) => {
    try {
        const tempGroups = await RegisterTempModel.find();
        res.status(200).json(tempGroups);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Read operation - Get tempGroup by ID
export const getTempGroupById = async (req, res) => {
    const { id } = req.params;
    try {
        const tempGroup = await RegisterTempModel.findById(id);
        if (!tempGroup) {
            return res.status(404).json({ error: "tempGroup not found" });
        }
        res.status(200).json(tempGroup);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Update operation - Update tempGroup by ID
export const updateTempGroup = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedtempGroup = await RegisterTempModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedtempGroup) {
            return res.status(404).json({ error: "tempGroup not found" });
        }
        res.status(200).json(updatedtempGroup);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Delete operation - Delete tempGroup by ID
export const deleteTempGroup = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedtempGroup = await RegisterTempModel.findByIdAndDelete(id);
        if (!deletedtempGroup) {
            return res.status(404).json({ error: "tempGroup not found" });
        }
        res.status(200).json(deletedtempGroup);
    } catch (error) {
        res.status(500).json(error);
    }
};
