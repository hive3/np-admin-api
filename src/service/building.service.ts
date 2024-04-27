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

      const result = await Building.findByPk(building.id, {include: { all: true }})
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create building' });
    }
  }

  async getBuildingById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const building = await Building.findByPk(id, { include: { all: true } });
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
        include: { all: true } 
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
         }, include: { all: true } });
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

  async getUnrealBuildingData(req: Request, res: Response) {
    try {
      const buildings = await Building.findAll({where:{ fid: { [Op.not]: null } }, include: { all: true } });
      if (buildings.length > 0) {
        const response = buildings.map(b=> this.parseBuildingToUnrealData(b));
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Buildings unreal not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve buildings unreal' });
    }
  }

  async getUnrealBuildingDataByFid(req: Request, res: Response) {
    try {
      const fid = parseInt(req.params.fid, 10);
      const building = await Building.findOne({where:{ fid: { [Op.eq]: fid } }, include: { all: true } });
      if (building) {
        const response = this.parseBuildingToUnrealData(building);
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Building unreal not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve building unreal' });
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

  parseBuildingToUnrealData(building: Building) {
    const { 
      fid, 
      buildingId, 
      floors, 
      Opening, 
      StructuralSystem,
      WallCovering,
      RoofCovering,
      UseType,
      CurrentState,
      ConservationLevel,
      ArchitectonicAdequacy,
      FacadeTypology,
      Interventions = [],
    } = building;
    return { 
      fid, 
      buildingId, 
      floors,  
      opening: Opening?.description,
      structuralSystem: StructuralSystem?.description,
      wallCovering: WallCovering?.description,
      roofCovering: RoofCovering?.description,
      useType: UseType?.description,
      currentState: CurrentState?.description,
      conservationLevel: ConservationLevel?.description,
      architectonicAdequacy: ArchitectonicAdequacy?.description,
      facadeTypology: FacadeTypology?.description,
      interventions: Interventions.length > 0 ? Interventions.map(i => i.description) : Interventions,
    }
  }
}

export default BuildingService;
