import { Request, Response } from 'express';
import StructuralSystem from '../model/structural-system.model';

class StructuralSystemService {

  async getStructuralSystemById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await StructuralSystem.findByPk(id, { include: { all: true, nested: true } });
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Structural System not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve Structural System' });
    }
  }

  async getStructuralSystems(req: Request, res: Response) {
    try {
      const response = await StructuralSystem.findAll();
      if (response) {
        this.setResponseHeaders(req, res, response.length);
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Structural Systems not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve Structural Systems' });
    }
  }

  setResponseHeaders(req:Request, res: Response, total: Number) {
    if(req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range.replace(/structuralSystems=/, "").split("-");
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader('Content-Range', `structuralSystems ${start}-${end}/${total}`);
      res.setHeader('Accept-Ranges', 'structuralSystems');
    }
  }

}

export default StructuralSystemService;
