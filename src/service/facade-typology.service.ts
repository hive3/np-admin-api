import { Request, Response } from 'express';
import FacadeTypology from '../model/facade-typology.model';
import { Op } from 'sequelize';
import Building from '../model/building.model';

class FacadeTypologyService {
  async getFacadeTypologyById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const response = await FacadeTypology.findByPk(id, {
        include: { all: true, nested: true },
      });
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Facade Typology not found' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to retrieve Facade Typology' });
    }
  }

  async getFacadeTypologies(req: Request, res: Response) {
    try {
      const response = await FacadeTypology.findAll();
      if (response) {
        this.setResponseHeaders(req, res, response.length);
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Facade Typology not found' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to retrieve Facade Typology' });
    }
  }

  setResponseHeaders(req: Request, res: Response, total: Number) {
    if (req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range
        .replace(/facadeTypology=/, '')
        .split('-');
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader(
        'Content-Range',
        `facadeTypology ${start}-${end}/${total}`
      );
      res.setHeader('Accept-Ranges', 'facadeTypology');
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { description } = req.body;
      const { id } = await FacadeTypology.create({
        description,
      });

      const result = await FacadeTypology.findByPk(id, {
        include: { all: true },
      });
      res.status(201).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to create Facade Typology' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const { description } = req.body;

      const [updatedRows] = await FacadeTypology.update(
        {
          description,
        },
        { where: { id } }
      );

      if (updatedRows > 0) {
        const updated = await FacadeTypology.findByPk(id);
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          error: 'Facade Typology not found or update failed',
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to update Facade Typology' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const buildingsAssociated: Building[] = await Building.findAll({
        where: { FacadeTypologyId: { [Op.eq]: id } },
      });

      if (buildingsAssociated.length > 0) {
        const buildingIds = buildingsAssociated.map((b) => b.id);
        await Building.update(
          {
            FacadeTypologyId: null,
          },
          {
            where: {
              id: {
                [Op.in]: [...buildingIds.toString().split(',')],
              },
            },
          }
        );
      }
      const deletedRows = await FacadeTypology.destroy({
        where: { id },
      });
      if (deletedRows > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({
          error: 'Facade Typology not found or deletion failed',
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to delete Facade Typology' });
    }
  }
}

export default FacadeTypologyService;
