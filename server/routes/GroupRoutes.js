import express from 'express';
import { createGroup, getAllGroups, getGroupById, updateGroup, deleteGroup, getDataByStudentId, getDataBySupId } from '../controllers/GroupContraller.js';
import { LoginValidator } from '../middlewares/LoggedIn.js';

const groupRouter = express.Router();

// Define routes
groupRouter.get('/', getAllGroups);
groupRouter.post('/', createGroup);
groupRouter.put('/:id',updateGroup);
groupRouter.delete('/:id', deleteGroup); 


groupRouter.get('/stdGroup', LoginValidator, getDataByStudentId);
groupRouter.get('/supProj', LoginValidator, getDataBySupId);

export default  groupRouter;