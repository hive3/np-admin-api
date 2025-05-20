import { Request, Response } from 'express';
import ArchitectonicAdequacy from '../model/architectonic-adequacy.model';
import Building from '../model/building.model';
import { Op } from 'sequelize';

class ArchitectonicAdequacyService {
  async getArchitectonicAdequacyById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await ArchitectonicAdequacy.findByPk(id, {
        include: { all: true, nested: true },
      });
      if (response) {
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .json({ error: 'Architectonic Adequacy not found' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to retrieve Architectonic Adequacy' });
    }
  }

  async getArchitectonicAdequacies(req: Request, res: Response) {
    try {
      const response = await ArchitectonicAdequacy.findAll();
      if (response) {
        this.setResponseHeaders(req, res, response.length);
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .json({ error: 'Architectonic Adequacy not found' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to retrieve architectonic adequacy' });
    }
  }

  setResponseHeaders(req: Request, res: Response, total: Number) {
    if (req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range
        .replace(/architectonicAdequacy=/, '')
        .split('-');
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader(
        'Content-Range',
        `architectonicAdequacy ${start}-${end}/${total}`
      );
      res.setHeader('Accept-Ranges', 'architectonicAdequacy');
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { description } = req.body;
      const { id } = await ArchitectonicAdequacy.create({
        description,
      });

      const result = await ArchitectonicAdequacy.findByPk(id, {
        include: { all: true },
      });
      res.status(201).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to create Architectonic Adequacy' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const { description } = req.body;

      const [updatedRows] = await ArchitectonicAdequacy.update(
        {
          description,
        },
        { where: { id } }
      );

      if (updatedRows > 0) {
        const updated = await ArchitectonicAdequacy.findByPk(id);
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          error: 'Architectonic Adequacy not found or update failed',
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to update Architectonic Adequacy' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const buildingsAssociated: Building[] = await Building.findAll({
        where: { ArchitectonicAdequacyId: { [Op.eq]: id } },
      });

      if (buildingsAssociated.length > 0) {
        res.status(400).json({
          error: `Architectonic Adequacy cannot be deleted buildings associated: ${buildingsAssociated.map(
            (b) => b.id
          )}`,
        });
      } else {
        const deletedRows = await ArchitectonicAdequacy.destroy({
          where: { id },
        });
        if (deletedRows > 0) {
          res.status(204).end();
        } else {
          res.status(404).json({
            error:
              'Architectonic Adequacy not found or deletion failed',
          });
        }
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to delete Architectonic Adequacy' });
    }
  }
}

export default ArchitectonicAdequacyService;
