import express from 'express';
import { createSubmission, getAllSubmissions, deleteSubmission, updateSubmission, getSubmissionById, getSubmissionByStdId, getSubmissionByAssId } from '../controllers/SubmissionController.js';
import { LoginValidator } from '../middlewares/LoggedIn.js';

const submissionRouter = express.Router();

submissionRouter.post('/', LoginValidator, createSubmission);
submissionRouter.get('/', getAllSubmissions);
submissionRouter.get('/:id', getSubmissionById);
submissionRouter.get('/submissionByAsses/:assId', getSubmissionByAssId);
submissionRouter.get('/subByStd/:id', getSubmissionByStdId);
submissionRouter.delete('/:id', deleteSubmission);
submissionRouter.put('/:id', updateSubmission);

export default submissionRouter;