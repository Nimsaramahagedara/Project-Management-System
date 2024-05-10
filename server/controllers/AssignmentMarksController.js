import AssignmentMarksModel from '../models/AssignmentMarksModel.js';
import AssignmentModel from '../models/AssignmentModel.js';
import UserModel from '../models/UserModel.js';
import jwt from 'jsonwebtoken';

// Controller function to add marks for an assignment
const addMarks = async (req, res) => {
    try {
        const { title, studentId, mark } = req.body;

        // Check if the assignment exists
        const assignment = await AssignmentModel.findById(title);
        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }

        // Check if the student exists
        const student = await UserModel.findById(studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Create new AssignmentMarks document
        const newMarks = new AssignmentMarksModel({
            title,
            studentId,
            mark
        });

        // Save marks
        const savedMarks = await newMarks.save();

        return res.status(201).json(savedMarks);
    } catch (error) {
        console.error('Error adding marks:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to fetch all marks of the logged-in user
const fetchUserMarks = async (req, res) => {
    try {
        // Extracting token from the request headers
        const token = req.headers.authorization.split(' ')[1];
        // Verifying the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Fetching the user ID from the decoded token
        const userId = decoded.id;

        // Find all marks for the logged-in user
        const userMarks = await AssignmentMarksModel.find({ studentId: userId });

        return res.status(200).json(userMarks);
    } catch (error) {
        console.error('Error fetching user marks:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export { addMarks, fetchUserMarks };
