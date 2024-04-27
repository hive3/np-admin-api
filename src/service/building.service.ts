import { Request, Response } from 'express';
import Building from '../model/building.model';
import BuildingIntervention from '../model/building-intervention.model';
import { Op } from 'sequelize';

class BuildingService {

  async createBuilding(req: Request, res: Response) {
    try {
      const { 
        ArchitectonicAdequacyId,
        ConservationLevelId,
        CurrentStateId,
        FacadeTypologyId,
        OpeningId,
        RoofCoveringId,
        StructuralSystemId,
        UseTypeId,
        WallCoveringId,
        buildingId,
        fid,
        floors,
        interventions
      } = req.body;

      const building = await Building.create({
        fid,
        buildingId,
        floors,
        StructuralSystemId,
        OpeningId,
        WallCoveringId,
        RoofCoveringId,
        UseTypeId,
        ConservationLevelId,
        CurrentStateId,
        ArchitectonicAdequacyId,
        FacadeTypologyId,
      });

      if (interventions) {
        const records = this.getBuildingInterventions(buildingId,  interventions);
        await BuildingIntervention.bulkCreate(records);
      }

      const result = await Building.findByPk(building.id, {include: { all: true, nested: true }})
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create building' });
    }
  }

  async getBuildingById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const building = await Building.findByPk(id, { include: { all: true, nested: true } });
      if (building) {
        res.status(200).json(building);
      } else {
        res.status(404).json({ error: 'Building not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve building' });
    }
  }

  async getBuildings(req: Request, res: Response) {
    try {
      const pagination = this.setPagination(req);
      const count = await Building.count(); 
      const result = await Building.findAll({ 
        ...pagination, 
        include: { all: true, nested: true } 
      });
      if (result) {
        this.setResponseHeaders(req, res, count);
        res.status(200).json(result);
      } else {
        res.status(404).json({ error: 'Buildings not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve buildings' });
    }
  }

  async updateBuilding(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const { 
        fid,
        floors,
        buildingId,
        StructuralSystemId,
        OpeningId,
        WallCoveringId,
        RoofCoveringId,
        UseTypeId,
        ConservationLevelId,
        CurrentStateId,
        ArchitectonicAdequacyId,
        FacadeTypologyId,
        interventions
      } = req.body;

      const [updatedRows] = await Building.update({ 
        fid,
        floors,
        StructuralSystemId,
        OpeningId,
        WallCoveringId,
        RoofCoveringId,
        UseTypeId,
        ConservationLevelId,
        CurrentStateId,
        ArchitectonicAdequacyId,
        FacadeTypologyId,
       }, { where: { id } });

      if (interventions) {
        const buildingInterventions = await BuildingIntervention.findAll({ where: { 
          BuildingId: {
            [Op.eq]: buildingId,
          }
         } });
        if (buildingInterventions) {
          await BuildingIntervention.destroy({ where: { BuildingId: buildingId } });          
        }
        const records = this.getBuildingInterventions(buildingId,  interventions);
        await BuildingIntervention.bulkCreate(records);
      }

      if (updatedRows > 0) {
        const updatedBuilding = await Building.findByPk(id);
        res.status(200).json(updatedBuilding);
      } else {
        res.status(404).json({ error: 'Building not found or update failed' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update building' });
    }
  }

  async deleteBuilding(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const deletedRows = await Building.destroy({ where: { id } });
      if (deletedRows > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'Building not found or deletion failed' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete building' });
    }
  }

  setResponseHeaders(req:Request, res: Response, total: Number) {
    if(req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range.replace(/buildings=/, "").split("-");
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader('Content-Range', `buildings ${start}-${end}/${total}`);
      res.setHeader('Accept-Ranges', 'buildings');
    }
  }

  setPagination(req: Request, ) {
    if(req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range.replace(/buildings=/, "").split("-");
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : 10;
      const { sort, filter}:any = req.query;
      const order = sort ? [JSON.parse(sort)] : [];
      return {
        order,
        limit: end - start + 1,
        offset: start,
      };
    }
    return {};    
  }

  getBuildingInterventions(buildingId: string, interventions:number[]) {
    return interventions.map((i: number) => 
      ({ BuildingId: buildingId,  InterventionId: i }));
  }

  interventionsHasChanged(buildingInterventions: BuildingIntervention[], interventions:number[]) {
    return buildingInterventions && 
      buildingInterventions.filter(bi => !interventions.includes(bi.InterventionId)).length > 0;
  }
}

export default BuildingService;
