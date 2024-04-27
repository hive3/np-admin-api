import { Request, Response } from 'express';
import FacadeTypology from '../model/facade-typology.model';

class FacadeTypologyService {

  async getFacadeTypologyById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await FacadeTypology.findByPk(id, { include: { all: true, nested: true } });
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Facade Typology not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve Facade Typology' });
    }
  }

  async getFacadeTypologies(req: Request, res: Response) {
    try {
      const response = await FacadeTypology.findAll();
      if (response) {
        this.setResponseHeaders(req, res, response.length);
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Facade Typology not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve Facade Typology' });
    }
  }

  setResponseHeaders(req:Request, res: Response, total: Number) {
    if(req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range.replace(/facadeTypology=/, "").split("-");
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader('Content-Range', `facadeTypology ${start}-${end}/${total}`);
      res.setHeader('Accept-Ranges', 'facadeTypology');
    }
  }

}

export default FacadeTypologyService;
