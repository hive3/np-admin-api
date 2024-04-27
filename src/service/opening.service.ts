import { Request, Response } from 'express';
import Opening from '../model/opening.model';

class OpeningService {

  async getOpeningById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await Opening.findByPk(id, { include: { all: true, nested: true } });
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Opening not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve opening' });
    }
  }

  async getOpenings(req: Request, res: Response) {
    try {
      const response = await Opening.findAll();
      if (response) {
        this.setResponseHeaders(req, res, response.length);
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Openings not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve openings' });
    }
  }

  setResponseHeaders(req:Request, res: Response, total: Number) {
    if(req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range.replace(/openings=/, "").split("-");
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader('Content-Range', `openings ${start}-${end}/${total}`);
      res.setHeader('Accept-Ranges', 'openings');
    }
  }

}

export default OpeningService;
