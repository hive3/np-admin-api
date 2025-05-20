import { Request, Response } from 'express';
import CurrentState from '../model/current-state.model';
import Building from '../model/building.model';
import { Op } from 'sequelize';

class CurrentStateService {
  async getCurrentStateById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await CurrentState.findByPk(id, {
        include: { all: true, nested: true },
      });
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Current state not found' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to retrieve current state' });
    }
  }

  async getCurrentStates(req: Request, res: Response) {
    try {
      const response = await CurrentState.findAll();
      if (response) {
        this.setResponseHeaders(req, res, response.length);
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Current states not found' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to retrieve current states' });
    }
  }

  setResponseHeaders(req: Request, res: Response, total: Number) {
    if (req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range
        .replace(/currentStates=/, '')
        .split('-');
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader(
        'Content-Range',
        `currentStates ${start}-${end}/${total}`
      );
      res.setHeader('Accept-Ranges', 'currentStates');
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { description } = req.body;
      const { id } = await CurrentState.create({
        description,
      });

      const result = await CurrentState.findByPk(id, {
        include: { all: true },
      });
      res.status(201).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to create Current State' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const { description } = req.body;

      const [updatedRows] = await CurrentState.update(
        {
          description,
        },
        { where: { id } }
      );

      if (updatedRows > 0) {
        const updated = await CurrentState.findByPk(id);
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          error: 'Current State not found or update failed',
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to update Current State' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const buildingsAssociated: Building[] = await Building.findAll({
        where: { CurrentStateId: { [Op.eq]: id } },
      });

      if (buildingsAssociated.length > 0) {
        res.status(400).json({
          error: `Current State cannot be deleted buildings associated: ${buildingsAssociated.map(
            (b) => b.id
          )}`,
        });
      } else {
        const deletedRows = await CurrentState.destroy({
          where: { id },
        });
        if (deletedRows > 0) {
          res.status(204).end();
        } else {
          res.status(404).json({
            error: 'Current State not found or deletion failed',
          });
        }
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to delete Current State' });
    }
  }
}

export default CurrentStateService;
