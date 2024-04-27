import express, { Request, Response } from 'express';
import StructuralSystemService from '../service/structural-system.service';

const router = express.Router();
const service = new StructuralSystemService();

router.get('/structural-systems', async (req: Request, res: Response) => {
  return service.getStructuralSystems(req, res);
});

router.get('/structural-systems/:id', async (req: Request, res: Response) => {
  return service.getStructuralSystemById(req, res);
});

export default router;