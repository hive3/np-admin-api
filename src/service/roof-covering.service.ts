import { Request, Response } from 'express';
import RoofCovering from '../model/roof-covering.model';

class RoofCoveringService {

  async getRoofCoveringById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await RoofCovering.findByPk(id, { include: { all: true, nested: true } });
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Roof Covering not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve Roof Covering' });
    }
  }

  async getRoofCoverings(req: Request, res: Response) {
    try {
      const response = await RoofCovering.findAll();
      if (response) {
        this.setResponseHeaders(req, res, response.length);
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Roof Coverings not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve Roof Coverings' });
    }
  }

  setResponseHeaders(req:Request, res: Response, total: Number) {
    if(req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range.replace(/roofCoverings=/, "").split("-");
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader('Content-Range', `roofCoverings ${start}-${end}/${total}`);
      res.setHeader('Accept-Ranges', 'roofCoverings');
    }
  }

}

export default RoofCoveringService;
