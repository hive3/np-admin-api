import { Request, Response } from 'express';
import Opening from '../model/opening.model';
import { Op } from 'sequelize';
import Building from '../model/building.model';

class OpeningService {
  async getOpeningById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await Opening.findByPk(id, {
        include: { all: true, nested: true },
      });
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

  setResponseHeaders(req: Request, res: Response, total: Number) {
    if (req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range
        .replace(/openings=/, '')
        .split('-');
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader(
        'Content-Range',
        `openings ${start}-${end}/${total}`
      );
      res.setHeader('Accept-Ranges', 'openings');
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { description } = req.body;
      const { id } = await Opening.create({
        description,
      });

      const result = await Opening.findByPk(id, {
        include: { all: true },
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create Opening' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const { description } = req.body;

      const [updatedRows] = await Opening.update(
        {
          description,
        },
        { where: { id } }
      );

      if (updatedRows > 0) {
        const updated = await Opening.findByPk(id);
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          error: 'Opening not found or update failed',
        });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update Opening' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const buildingsAssociated: Building[] = await Building.findAll({
        where: { OpeningId: { [Op.eq]: id } },
      });

      if (buildingsAssociated.length > 0) {
        res.status(400).json({
          error: `Opening cannot be deleted buildings associated: ${buildingsAssociated.map(
            (b) => b.id
          )}`,
        });
      } else {
        const deletedRows = await Opening.destroy({
          where: { id },
        });
        if (deletedRows > 0) {
          res.status(204).end();
        } else {
          res.status(404).json({
            error: 'Opening not found or deletion failed',
          });
        }
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete Opening' });
    }
  }
}

export default OpeningService;
