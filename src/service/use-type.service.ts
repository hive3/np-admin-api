import { Request, Response } from 'express';
import UseType from '../model/use-type.model';

class UseTypeService {

  async getUseTypeById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await UseType.findByPk(id, { include: { all: true, nested: true } });
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Use Type not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve Use Type' });
    }
  }

  async getUseTypes(req: Request, res: Response) {
    try {
      const response = await UseType.findAll();
      if (response) {
        this.setResponseHeaders(req, res, response.length);
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Use Types not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve Use Types' });
    }
  }

  setResponseHeaders(req:Request, res: Response, total: Number) {
    if(req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range.replace(/useTypes=/, "").split("-");
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader('Content-Range', `useTypes ${start}-${end}/${total}`);
      res.setHeader('Accept-Ranges', 'useTypes');
    }
  }

}

export default UseTypeService;
