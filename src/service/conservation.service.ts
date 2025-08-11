import { Request, Response } from 'express';
import Conservation from '../model/conservation.model';
import { Op } from 'sequelize';
import BuildingConservation from '../model/building-conservation.model';

class ConservationService {
  async getConservationById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await Conservation.findByPk(id, {
        include: { all: true, nested: true },
      });
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Conservation not found' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Conservation to retrieve opening' });
    }
  }

  async getConservations(req: Request, res: Response) {
    try {
      const response = await Conservation.findAll();
      if (response) {
        this.setResponseHeaders(req, res, response.length);
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Conservations not found' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to retrieve Conservations' });
    }
  }

  setResponseHeaders(req: Request, res: Response, total: Number) {
    if (req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range
        .replace(/conservations=/, '')
        .split('-');
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader(
        'Content-Range',
        `conservations ${start}-${end}/${total}`
      );
      res.setHeader('Accept-Ranges', 'conservation');
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { description } = req.body;
      const { id } = await Conservation.create({
        description,
      });

      const result = await Conservation.findByPk(id, {
        include: { all: true },
      });
      res.status(201).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to create Conservation' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const { description } = req.body;

      const [updatedRows] = await Conservation.update(
        {
          description,
        },
        { where: { id } }
      );

      if (updatedRows > 0) {
        const updated = await Conservation.findByPk(id);
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          error: 'Conservation not found or update failed',
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to update Conservation' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const buildingConservations =
        await BuildingConservation.findAll({
          where: {
            ConservationId: {
              [Op.eq]: id,
            },
          },
          include: { all: true },
        });
      if (buildingConservations) {
        await BuildingConservation.destroy({
          where: { ConservationId: id },
        });
      }
      const deletedRows = await Conservation.destroy({
        where: { id },
      });
      if (deletedRows > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({
          error: 'Conservation not found or deletion failed',
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to delete Conservation' });
    }
  }
}

export default ConservationService;
