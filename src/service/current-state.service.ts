import { Request, Response } from 'express';
import CurrentState from '../model/current-state.model';

class CurrentStateService {

  async getCurrentStateById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await CurrentState.findByPk(id, { include: { all: true, nested: true } });
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Current state not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve current state' });
    }
  }

  async getCurrentStates(req: Request, res: Response) {
    try {
      const response = await CurrentState.findAll();
      if (response) {
        this.setResponseHeaders(req, res, response.length);
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Current states not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve current states' });
    }
  }

  setResponseHeaders(req:Request, res: Response, total: Number) {
    if(req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range.replace(/currentStates=/, "").split("-");
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader('Content-Range', `currentStates ${start}-${end}/${total}`);
      res.setHeader('Accept-Ranges', 'currentStates');
    }
  }

}

export default CurrentStateService;
