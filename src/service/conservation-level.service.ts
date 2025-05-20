import { Request, Response } from 'express';
import ConservationLevel from '../model/conservation-level.model';
import Building from '../model/building.model';
import { Op } from 'sequelize';

class ConservationLevelService {

  async getConservationLevelById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await ConservationLevel.findByPk(id, { include: { all: true, nested: true } });
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Conservation Level not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve Conservation Level' });
    }
  }

  async getConservationLevels(req: Request, res: Response) {
    try {
      const response = await ConservationLevel.findAll();
      if (response) {
        this.setResponseHeaders(req, res, response.length);
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Conservation Levels not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve Conservation Levels' });
    }
  }

  setResponseHeaders(req:Request, res: Response, total: Number) {
    if(req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range.replace(/conservationLevels=/, "").split("-");
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader('Content-Range', `conservationLevels ${start}-${end}/${total}`);
      res.setHeader('Accept-Ranges', 'conservationLevels');
    }
  }

    async create(req: Request, res: Response) {
    try {
      const { description } = req.body;
      const { id } = await ConservationLevel.create({
        description,
      });

      const result = await ConservationLevel.findByPk(id, {
        include: { all: true },
      });
      res.status(201).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to create Conservation Level' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const { description } = req.body;

      const [updatedRows] = await ConservationLevel.update(
        {
          description,
        },
        { where: { id } }
      );

      if (updatedRows > 0) {
        const updated = await ConservationLevel.findByPk(id);
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          error: 'Conservation Level not found or update failed',
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to update Conservation Level' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const buildingsAssociated: Building[] = await Building.findAll({
        where: { ConservationLevelId: { [Op.eq]: id } },
      });

      if (buildingsAssociated.length > 0) {
        res.status(400).json({
          error: `Conservation Level cannot be deleted buildings associated: ${buildingsAssociated.map(
            (b) => b.id
          )}`,
        });
      } else {
        const deletedRows = await ConservationLevel.destroy({
          where: { id },
        });
        if (deletedRows > 0) {
          res.status(204).end();
        } else {
          res.status(404).json({
            error:
              'Conservation Level not found or deletion failed',
          });
        }
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to delete Conservation Level' });
    }
  }
}

export default ConservationLevelService;
