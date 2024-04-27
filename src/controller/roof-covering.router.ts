import express, { Request, Response } from 'express';
import RoofCoveringService from '../service/roof-covering.service';

const router = express.Router();
const service = new RoofCoveringService();

router.get('/roof-coverings', async (req: Request, res: Response) => {
  return service.getRoofCoverings(req, res);
});

router.get('/roof-coverings/:id', async (req: Request, res: Response) => {
  return service.getRoofCoveringById(req, res);
});

export default router;