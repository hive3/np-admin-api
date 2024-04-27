import { Request, Response } from 'express';
import WallCovering from '../model/wall-covering.model';

class WallCoveringService {

  async getWallCoveringById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await WallCovering.findByPk(id, { include: { all: true, nested: true } });
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Wall Covering not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve Wall Covering' });
    }
  }

  async getWallCoverings(req: Request, res: Response) {
    try {
      const response = await WallCovering.findAll();
      if (response) {
        this.setResponseHeaders(req, res, response.length);
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Wall Coverings not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve Wall Coverings' });
    }
  }

  setResponseHeaders(req:Request, res: Response, total: Number) {
    if(req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range.replace(/wallCoverings=/, "").split("-");
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader('Content-Range', `wallCoverings ${start}-${end}/${total}`);
      res.setHeader('Accept-Ranges', 'wallCoverings');
    }
  }

}

export default WallCoveringService;
