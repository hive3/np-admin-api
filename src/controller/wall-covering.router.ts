import express, { Request, Response } from 'express';
import WallCoveringService from '../service/wall-covering.service';

const router = express.Router();
const service = new WallCoveringService();

router.get('/wall-coverings', async (req: Request, res: Response) => {
  return service.getWallCoverings(req, res);
});

router.get('/wall-coverings/:id', async (req: Request, res: Response) => {
  return service.getWallCoveringById(req, res);
});

export default router;