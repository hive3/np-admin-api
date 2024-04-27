import { Request, Response } from 'express';
import ConservationLevel from '../model/conservation-level.model';

class ConservationLevelService {

  async getConservationLevelById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await ConservationLevel.findByPk(id, { include: { all: true, nested: true } });
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Conservation Level not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve Conservation Level' });
    }
  }

  async getConservationLevels(req: Request, res: Response) {
    try {
      const response = await ConservationLevel.findAll();
      if (response) {
        this.setResponseHeaders(req, res, response.length);
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Conservation Levels not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve Conservation Levels' });
    }
  }

  setResponseHeaders(req:Request, res: Response, total: Number) {
    if(req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range.replace(/conservationLevels=/, "").split("-");
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader('Content-Range', `conservationLevels ${start}-${end}/${total}`);
      res.setHeader('Accept-Ranges', 'conservationLevels');
    }
  }

}

export default ConservationLevelService;
