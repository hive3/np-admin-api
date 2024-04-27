import express, { Request, Response } from 'express';
import ConservationLevelService from '../service/conservation-level.service';

const router = express.Router();
const service = new ConservationLevelService();

router.get('/conservation-levels', async (req: Request, res: Response) => {
  return service.getConservationLevels(req, res);
});

router.get('/conservation-levels/:id', async (req: Request, res: Response) => {
  return service.getConservationLevelById(req, res);
});

export default router;