import { Request, Response } from 'express';
import Intervention from '../model/intervention.model';

class InterventionService {

  async getInterventionById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await Intervention.findByPk(id, { include: { all: true, nested: true } });
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Intervention not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Intervention to retrieve opening' });
    }
  }

  async getInterventions(req: Request, res: Response) {
    try {
      const response = await Intervention.findAll();
      if (response) {
        this.setResponseHeaders(req, res, response.length);
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Interventions not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve Interventions' });
    }
  }

  setResponseHeaders(req:Request, res: Response, total: Number) {
    if(req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range.replace(/interventions=/, "").split("-");
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader('Content-Range', `interventions ${start}-${end}/${total}`);
      res.setHeader('Accept-Ranges', 'intervention');
    }
  }

}

export default InterventionService;
