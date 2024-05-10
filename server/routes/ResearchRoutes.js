import express from 'express';
import { createResearch, getAllResearch, deleteResearch, updateResearch, getOneResearch, getResearchByStd } from '../controllers/ResearchController.js';
import { LoginValidator } from '../middlewares/LoggedIn.js';

const researchRouter = express.Router();

researchRouter.post('/', createResearch);
researchRouter.get('/std', LoginValidator, getResearchByStd);
researchRouter.get('/', getAllResearch);
researchRouter.get('/:id', getOneResearch);
researchRouter.delete('/:id', deleteResearch);
researchRouter.put('/:id', updateResearch);


export default researchRouter;