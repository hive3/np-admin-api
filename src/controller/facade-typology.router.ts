import express, { Request, Response } from 'express';
import FacadeTypologyService from '../service/facade-typology.service';

const router = express.Router();
const service = new FacadeTypologyService();

router.get('/facade-typologies', async (req: Request, res: Response) => {
  return service.getFacadeTypologies(req, res);
});

router.get('/facade-typologies/:id', async (req: Request, res: Response) => {
  return service.getFacadeTypologyById(req, res);
});

export default router;