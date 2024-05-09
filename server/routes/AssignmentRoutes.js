import express from 'express';
import { createAssignment, getAllAssignments, getAssignmentById, updateAssignment, deleteAssignment } from '../controllers/AssignmentContraller.js';

const assignmentRouter = express.Router();

// Define routes
assignmentRouter.get('/', getAllAssignments);
assignmentRouter.post('/', createAssignment);
assignmentRouter.put('/:id',updateAssignment);
assignmentRouter.delete('/:id', deleteAssignment); 

export default  assignmentRouter;