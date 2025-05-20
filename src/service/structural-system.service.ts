import { Request, Response } from 'express';
import StructuralSystem from '../model/structural-system.model';
import Building from '../model/building.model';
import { Op } from 'sequelize';

class StructuralSystemService {
  async getStructuralSystemById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await StructuralSystem.findByPk(id, {
        include: { all: true, nested: true },
      });
      if (response) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .json({ error: 'Structural System not found' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to retrieve Structural System' });
    }
  }

  async getStructuralSystems(req: Request, res: Response) {
    try {
      const response = await StructuralSystem.findAll();
      if (response) {
        this.setResponseHeaders(req, res, response.length);
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .json({ error: 'Structural Systems not found' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to retrieve Structural Systems' });
    }
  }

  setResponseHeaders(req: Request, res: Response, total: Number) {
    if (req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range
        .replace(/structuralSystems=/, '')
        .split('-');
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader(
        'Content-Range',
        `structuralSystems ${start}-${end}/${total}`
      );
      res.setHeader('Accept-Ranges', 'structuralSystems');
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { description } = req.body;
      const { id } = await StructuralSystem.create({
        description,
      });

      const result = await StructuralSystem.findByPk(id, {
        include: { all: true },
      });
      res.status(201).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to create Structural System' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const { description } = req.body;

      const [updatedRows] = await StructuralSystem.update(
        {
          description,
        },
        { where: { id } }
      );

      if (updatedRows > 0) {
        const updated = await StructuralSystem.findByPk(id);
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          error: 'Structural System not found or update failed',
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to update Structural System' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const buildingsAssociated: Building[] = await Building.findAll({
        where: { StructuralSystemId: { [Op.eq]: id } },
      });

      if (buildingsAssociated.length > 0) {
        res.status(400).json({
          error: `Structural System cannot be deleted buildings associated: ${buildingsAssociated.map(
            (b) => b.id
          )}`,
        });
      } else {
        const deletedRows = await StructuralSystem.destroy({
          where: { id },
        });
        if (deletedRows > 0) {
          res.status(204).end();
        } else {
          res.status(404).json({
            error: 'Structural System not found or deletion failed',
          });
        }
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to delete Structural System' });
    }
  }
}

export default StructuralSystemService;
