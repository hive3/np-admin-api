import express, { Request, Response } from 'express';
import ArchitectonicAdequacyService from '../service/architectonic-adequacy.service';

const router = express.Router();
const service = new ArchitectonicAdequacyService();

router.get('/architectonic-adequacies', async (req: Request, res: Response) => {
  return service.getArchitectonicAdequacies(req, res);
});

router.get('/architectonic-adequacies/:id', async (req: Request, res: Response) => {
  return service.getArchitectonicAdequacyById(req, res);
});

export default router;