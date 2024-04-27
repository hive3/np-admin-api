import express, { Request, Response } from 'express';
import UseTypeService from '../service/use-type.service';

const router = express.Router();
const service = new UseTypeService();

router.get('/use-types', async (req: Request, res: Response) => {
  return service.getUseTypes(req, res);
});

router.get('/use-types/:id', async (req: Request, res: Response) => {
  return service.getUseTypeById(req, res);
});

export default router;