import { Request, Response } from 'express';
import WallCovering from '../model/wall-covering.model';
import Building from '../model/building.model';
import { Op } from 'sequelize';

class WallCoveringService {
  async getWallCoveringById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await WallCovering.findByPk(id, {
        include: { all: true, nested: true },
      });
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Wall Covering not found' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to retrieve Wall Covering' });
    }
  }

  async getWallCoverings(req: Request, res: Response) {
    try {
      const response = await WallCovering.findAll();
      if (response) {
        this.setResponseHeaders(req, res, response.length);
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Wall Coverings not found' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to retrieve Wall Coverings' });
    }
  }

  setResponseHeaders(req: Request, res: Response, total: Number) {
    if (req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range
        .replace(/wallCoverings=/, '')
        .split('-');
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader(
        'Content-Range',
        `wallCoverings ${start}-${end}/${total}`
      );
      res.setHeader('Accept-Ranges', 'wallCoverings');
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { description } = req.body;
      const { id } = await WallCovering.create({
        description,
      });

      const result = await WallCovering.findByPk(id, {
        include: { all: true },
      });
      res.status(201).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to create Wall Covering' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const { description } = req.body;

      const [updatedRows] = await WallCovering.update(
        {
          description,
        },
        { where: { id } }
      );

      if (updatedRows > 0) {
        const updated = await WallCovering.findByPk(id);
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          error: 'Wall Covering not found or update failed',
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to update Wall Covering' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const buildingsAssociated: Building[] = await Building.findAll({
        where: { WallCoveringId: { [Op.eq]: id } },
      });

      if (buildingsAssociated.length > 0) {
        res.status(400).json({
          error: `Wall Covering cannot be deleted buildings associated: ${buildingsAssociated.map(
            (b) => b.id
          )}`,
        });
      } else {
        const deletedRows = await WallCovering.destroy({
          where: { id },
        });
        if (deletedRows > 0) {
          res.status(204).end();
        } else {
          res.status(404).json({
            error: 'Wall Covering not found or deletion failed',
          });
        }
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to delete Wall Covering' });
    }
  }
}

export default WallCoveringService;
