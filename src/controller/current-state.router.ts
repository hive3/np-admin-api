import express, { Request, Response } from 'express';
import CurrentStateService from '../service/current-state.service';

const router = express.Router();
const service = new CurrentStateService();

router.get('/current-states', async (req: Request, res: Response) => {
  return service.getCurrentStates(req, res);
});

router.get('/current-states/:id', async (req: Request, res: Response) => {
  return service.getCurrentStateById(req, res);
});

export default router;