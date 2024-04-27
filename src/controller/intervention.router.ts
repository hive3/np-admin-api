import express, { Request, Response } from 'express';
import InterventionService from '../service/intervention.service';

const router = express.Router();
const service = new InterventionService();

router.get('/interventions', async (req: Request, res: Response) => {
  return service.getInterventions(req, res);
});

router.get('/interventions/:id', async (req: Request, res: Response) => {
  return service.getInterventionById(req, res);
});

export default router;