import express from 'express';
import { addMarks, fetchUserMarks } from '../controllers/AssignmentMarksController.js';
import { LoginValidator } from '../middlewares/LoggedIn.js';

const assignmentMarksRouter = express.Router();

// Route to add marks for an assignment
assignmentMarksRouter.post('/add', addMarks);
assignmentMarksRouter.get('/usermarks',LoginValidator, fetchUserMarks)

export default assignmentMarksRouter;
