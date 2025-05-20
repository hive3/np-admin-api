import { Request, Response } from 'express';
import Intervention from '../model/intervention.model';
import { Op } from 'sequelize';
import BuildingIntervention from '../model/building-intervention.model';

class InterventionService {
  async getInterventionById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await Intervention.findByPk(id, {
        include: { all: true, nested: true },
      });
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Intervention not found' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Intervention to retrieve opening' });
    }
  }

  async getInterventions(req: Request, res: Response) {
    try {
      const response = await Intervention.findAll();
      if (response) {
        this.setResponseHeaders(req, res, response.length);
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Interventions not found' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to retrieve Interventions' });
    }
  }

  setResponseHeaders(req: Request, res: Response, total: Number) {
    if (req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range
        .replace(/interventions=/, '')
        .split('-');
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader(
        'Content-Range',
        `interventions ${start}-${end}/${total}`
      );
      res.setHeader('Accept-Ranges', 'intervention');
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { description } = req.body;
      const { id } = await Intervention.create({
        description,
      });

      const result = await Intervention.findByPk(id, {
        include: { all: true },
      });
      res.status(201).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to create Intervention' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const { description } = req.body;

      const [updatedRows] = await Intervention.update(
        {
          description,
        },
        { where: { id } }
      );

      if (updatedRows > 0) {
        const updated = await Intervention.findByPk(id);
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          error: 'Intervention not found or update failed',
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to update Intervention' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const buildingInterventions =
        await BuildingIntervention.findAll({
          where: {
            InterventionId: {
              [Op.eq]: id,
            },
          },
          include: { all: true },
        });
      if (buildingInterventions) {
        await BuildingIntervention.destroy({
          where: { InterventionId: id },
        });
      }
      const deletedRows = await Intervention.destroy({
        where: { id },
      });
      if (deletedRows > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({
          error: 'Intervention not found or deletion failed',
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to delete Intervention' });
    }
  }
}

export default InterventionService;
