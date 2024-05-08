import express from 'express';
import { createGroup, getAllGroups, getGroupById, updateGroup, deleteGroup } from '../controllers/GroupContraller.js';

const groupRouter = express.Router();

// Define routes
groupRouter.get('/', getAllGroups);
groupRouter.post('/', createGroup);
groupRouter.put('/:id',updateGroup);
groupRouter.delete('/:id', deleteGroup); 

export default  groupRouter;