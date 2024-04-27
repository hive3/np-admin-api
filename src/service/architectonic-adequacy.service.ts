import { Request, Response } from 'express';
import ArchitectonicAdequacy from '../model/architectonic-adequacy.model';

class ArchitectonicAdequacyService {

  async getArchitectonicAdequacyById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await ArchitectonicAdequacy.findByPk(id, { include: { all: true, nested: true } });
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Architectonic Adequacy not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve Architectonic Adequacy' });
    }
  }

  async getArchitectonicAdequacies(req: Request, res: Response) {
    try {
      const response = await ArchitectonicAdequacy.findAll();
      if (response) {
        this.setResponseHeaders(req, res, response.length);
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Architectonic Adequacy not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve architectonic adequacy' });
    }
  }

  setResponseHeaders(req:Request, res: Response, total: Number) {
    if(req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range.replace(/architectonicAdequacy=/, "").split("-");
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader('Content-Range', `architectonicAdequacy ${start}-${end}/${total}`);
      res.setHeader('Accept-Ranges', 'architectonicAdequacy');
    }
  }

}

export default ArchitectonicAdequacyService;
