import express, { Request, Response } from 'express';
import OpeningService from '../service/opening.service';

const router = express.Router();
const service = new OpeningService();

router.get('/openings', async (req: Request, res: Response) => {
  return service.getOpenings(req, res);
});

router.get('/openings/:id', async (req: Request, res: Response) => {
  return service.getOpeningById(req, res);
});

export default router;