import express from 'express';
import { CreateSupportAccount, deleteSupportMember, getAllSupportMembers, getSupportMember, updateSupportMember } from '../controllers/SupportController.js';
import { CreateSupervisorAccount, deleteSupervisor, getAllSupervisors, getTeacher, updateSupervisor } from '../controllers/TeacherContraller.js';
import { getOverview } from '../controllers/AdminControlller.js';
import { gradeUp } from '../controllers/ClassController.js';

const adminRouter = express.Router();

adminRouter.get('/get-overview',getOverview);
adminRouter.get('/get-all-support',getAllSupportMembers);
adminRouter.get('/get-support/:email',getSupportMember);
adminRouter.put('/update-support/:email',updateSupportMember);
adminRouter.delete('/delete-support/:email', deleteSupportMember);
adminRouter.post('/create-support', CreateSupportAccount);

adminRouter.get('/get-all-supervisors',getAllSupervisors);
adminRouter.get('/get-teacher/:email',getTeacher);
adminRouter.put('/update-supervisor/:email',updateSupervisor);
adminRouter.delete('/delete-supervisor/:email', deleteSupervisor);
adminRouter.post('/create-supervisor', CreateSupervisorAccount);
adminRouter.get('/grade-up', gradeUp);


export default adminRouter;