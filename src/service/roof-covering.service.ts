import { Request, Response } from 'express';
import RoofCovering from '../model/roof-covering.model';
import { Op } from 'sequelize';
import Building from '../model/building.model';

class RoofCoveringService {
  async getRoofCoveringById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await RoofCovering.findByPk(id, {
        include: { all: true, nested: true },
      });
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Roof Covering not found' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to retrieve Roof Covering' });
    }
  }

  async getRoofCoverings(req: Request, res: Response) {
    try {
      const response = await RoofCovering.findAll();
      if (response) {
        this.setResponseHeaders(req, res, response.length);
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Roof Coverings not found' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to retrieve Roof Coverings' });
    }
  }

  setResponseHeaders(req: Request, res: Response, total: Number) {
    if (req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range
        .replace(/roofCoverings=/, '')
        .split('-');
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader(
        'Content-Range',
        `roofCoverings ${start}-${end}/${total}`
      );
      res.setHeader('Accept-Ranges', 'roofCoverings');
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { description } = req.body;
      const { id } = await RoofCovering.create({
        description,
      });

      const result = await RoofCovering.findByPk(id, {
        include: { all: true },
      });
      res.status(201).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to create Roof Covering' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const { description } = req.body;

      const [updatedRows] = await RoofCovering.update(
        {
          description,
        },
        { where: { id } }
      );

      if (updatedRows > 0) {
        const updated = await RoofCovering.findByPk(id);
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          error: 'Roof Covering not found or update failed',
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to update Roof Covering' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const buildingsAssociated: Building[] = await Building.findAll({
        where: { RoofCoveringId: { [Op.eq]: id } },
      });

      if (buildingsAssociated.length > 0) {
        res.status(400).json({
          error: `Roof Covering cannot be deleted buildings associated: ${buildingsAssociated.map(
            (b) => b.id
          )}`,
        });
      } else {
        const deletedRows = await RoofCovering.destroy({
          where: { id },
        });
        if (deletedRows > 0) {
          res.status(204).end();
        } else {
          res.status(404).json({
            error: 'Roof Covering not found or deletion failed',
          });
        }
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to delete Roof Covering' });
    }
  }
}

export default RoofCoveringService;
