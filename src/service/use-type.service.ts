import { Request, Response } from 'express';
import UseType from '../model/use-type.model';
import { Op } from 'sequelize';
import Building from '../model/building.model';

class UseTypeService {
  async getUseTypeById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await UseType.findByPk(id, {
        include: { all: true, nested: true },
      });
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

  setResponseHeaders(req: Request, res: Response, total: Number) {
    if (req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range
        .replace(/useTypes=/, '')
        .split('-');
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader(
        'Content-Range',
        `useTypes ${start}-${end}/${total}`
      );
      res.setHeader('Accept-Ranges', 'useTypes');
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { description } = req.body;
      const { id } = await UseType.create({
        description,
      });

      const result = await UseType.findByPk(id, {
        include: { all: true },
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create Use Type' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const { description } = req.body;

      const [updatedRows] = await UseType.update(
        {
          description,
        },
        { where: { id } }
      );

      if (updatedRows > 0) {
        const updated = await UseType.findByPk(id);
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          error: 'Use Type not found or update failed',
        });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update Use Type' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const buildingsAssociated: Building[] = await Building.findAll({
        where: { UseTypeId: { [Op.eq]: id } },
      });

      if (buildingsAssociated.length > 0) {
        res.status(400).json({
          error: `Use Type cannot be deleted buildings associated: ${buildingsAssociated.map(
            (b) => b.id
          )}`,
        });
      } else {
        const deletedRows = await UseType.destroy({
          where: { id },
        });
        if (deletedRows > 0) {
          res.status(204).end();
        } else {
          res.status(404).json({
            error: 'Use Type not found or deletion failed',
          });
        }
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete Use Type' });
    }
  }
}

export default UseTypeService;
