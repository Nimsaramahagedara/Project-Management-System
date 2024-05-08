import express from 'express';
import { createTempGroup, getAllTempGroups, getTempGroupById, updateTempGroup, deleteTempGroup } from '../controllers/RegisterTempController.js';

const registerTempRouter = express.Router();

// Define routes
registerTempRouter.get('/', getAllTempGroups);
registerTempRouter.post('/', createTempGroup);
registerTempRouter.put('/:id',updateTempGroup);
registerTempRouter.delete('/:id', deleteTempGroup); 

export default  registerTempRouter;