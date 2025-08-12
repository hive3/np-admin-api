import { Request, Response } from 'express';
import { Op, WhereOptions } from 'sequelize';
import Building from '../model/building.model';
import BuildingIntervention from '../model/building-intervention.model';
import BuildingConservation from '../model/building-conservation.model';

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
        index,
        isCulturalHeritage,
        isCulturallySignificantArea,
        interventions,
        conservations,
      } = req.body;

      const building = await Building.create({
        fid,
        buildingId,
        floors,
        index,
        isCulturalHeritage,
        isCulturallySignificantArea,
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
        const records = this.getBuildingInterventions(
          building.id,
          interventions
        );
        await BuildingIntervention.bulkCreate(records);
      }

      if (conservations) {
        const records = this.getBuildingConservations(
          building.id,
          conservations
        );
        await BuildingConservation.bulkCreate(records);
      }

      const result = await Building.findByPk(building.id, {
        include: { all: true },
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create building' });
    }
  }

  async getBuildingById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const building = await Building.findByPk(id, {
        include: { all: true },
      });
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
        include: { all: true },
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
        index,
        isCulturalHeritage,
        isCulturallySignificantArea,
        StructuralSystemId,
        OpeningId,
        WallCoveringId,
        RoofCoveringId,
        UseTypeId,
        ConservationLevelId,
        CurrentStateId,
        ArchitectonicAdequacyId,
        FacadeTypologyId,
        interventions,
        conservations,
      } = req.body;

      const [updatedRows] = await Building.update(
        {
          fid,
          floors,
          index,
          isCulturalHeritage,
          isCulturallySignificantArea,
          StructuralSystemId,
          OpeningId,
          WallCoveringId,
          RoofCoveringId,
          UseTypeId,
          ConservationLevelId,
          CurrentStateId,
          ArchitectonicAdequacyId,
          FacadeTypologyId,
        },
        { where: { id } }
      );

      if (interventions) {
        const buildingInterventions =
          await BuildingIntervention.findAll({
            where: {
              BuildingId: {
                [Op.eq]: id,
              },
            },
            include: { all: true },
          });
        if (buildingInterventions) {
          await BuildingIntervention.destroy({
            where: { BuildingId: id },
          });
        }
        const recordsInterventions = this.getBuildingInterventions(
          id,
          interventions
        );
        await BuildingIntervention.bulkCreate(recordsInterventions);
      }

      if (conservations) {
        const buildingConservations =
          await BuildingConservation.findAll({
            where: {
              BuildingId: {
                [Op.eq]: id,
              },
            },
            include: { all: true },
          });
        if (buildingConservations) {
          await BuildingConservation.destroy({
            where: { BuildingId: id },
          });
        }
        const recordsConservation = this.getBuildingConservations(
          id,
          conservations
        );
        await BuildingConservation.bulkCreate(recordsConservation);
      }

      if (updatedRows > 0) {
        const updatedBuilding = await Building.findByPk(id);
        res.status(200).json(updatedBuilding);
      } else {
        res
          .status(404)
          .json({ error: 'Building not found or update failed' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update building' });
    }
  }

  async deleteBuilding(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);

      const buildingInterventions =
        await BuildingIntervention.findAll({
          where: {
            BuildingId: {
              [Op.eq]: id,
            },
          },
          include: { all: true },
        });
      if (buildingInterventions) {
        await BuildingIntervention.destroy({
          where: { BuildingId: id },
        });
      }

      const buildingConservations =
        await BuildingConservation.findAll({
          where: {
            BuildingId: {
              [Op.eq]: id,
            },
          },
          include: { all: true },
        });
      if (buildingConservations) {
        await BuildingConservation.destroy({
          where: { BuildingId: id },
        });
      }

      const deletedRows = await Building.destroy({ where: { id } });
      if (deletedRows > 0) {
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ error: 'Building not found or deletion failed' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete building' });
    }
  }

  async getBuildingsByFilters(req: Request, res: Response) {
    const queryParams = [
      'floors',
      'index',
      'OpeningId',
      'StructuralSystemId',
      'WallCoveringId',
      'RoofCoveringId',
      'UseTypeId',
      'CurrentStateId',
      'ConservationLevelId',
      'ArchitectonicAdequacyId',
      'FacadeTypologyId',
    ];

    const queryBoolParams = [
      'isCulturalHeritage',
      'isCulturallySignificantArea',
    ];

    const whereInit: WhereOptions<any> = {
      fid: { [Op.not]: null },
    };

    const whereIn: WhereOptions<any> = queryParams.reduce(
      (res, p) => {
        const param = req.query[p];
        if (param) {
          res[p] = { [Op.in]: [...param.toString().split(',')] };
        }
        return res;
      },
      { ...whereInit }
    );

    const where: WhereOptions<any> = queryBoolParams.reduce(
      (res, p) => {
        const param = req.query[p];
        if (param) {
          res[p] = {
            [Op.is]: req.query[p] === 'true' ? true : false,
          };
        }
        return res;
      },
      { ...whereIn }
    );

    return await Building.findAll({
      where,
      include: { all: true },
    });
  }

  async getUnrealBuildingsData(req: Request, res: Response) {
    try {
      const buildings: Building[] = await this.getBuildingsByFilters(
        req,
        res
      );
      if (buildings.length > 0) {
        const interventions = this.filterInterventions(req);
        const conservations = this.filterConservations(req);
        const response = buildings
          .filter(
            (b) =>
              !interventions ||
              (interventions.length === 0 &&
                b.Interventions.length === 0) ||
              b.Interventions.some((i) =>
                interventions.includes(i.id.toString())
              )
          )
          .filter(
            (b) =>
              !conservations ||
              (conservations.length === 0 &&
                b.Conservations.length === 0) ||
              b.Conservations.some((i) =>
                conservations.includes(i.id.toString())
              )
          )
          .map((b) => this.parseBuildingToUnrealData(b));
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Unreal Building not found' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to retrieve Unreal building' });
    }
  }

  async getUnrealBuildingsFidData(req: Request, res: Response) {
    try {
      const buildings: Building[] = await this.getBuildingsByFilters(
        req,
        res
      );
      if (buildings.length > 0) {
        const interventions = this.filterInterventions(req);
        const conservations = this.filterConservations(req);
        const response = buildings
          .filter(
            (b) =>
              !interventions ||
              (interventions.length === 0 &&
                b.Interventions.length === 0) ||
              b.Interventions.some((i) =>
                interventions.includes(i.id.toString())
              )
          )
          .filter(
            (b) =>
              !conservations ||
              (conservations.length === 0 &&
                b.Conservations.length === 0) ||
              b.Conservations.some((i) =>
                conservations.includes(i.id.toString())
              )
          )
          .map((b) => b.fid);
        res.status(200).json({ response });
      } else {
        res.status(404).json({ error: 'Unreal Building not found' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to retrieve Unreal building' });
    }
  }

  async getUnrealBuildingDataByFid(req: Request, res: Response) {
    try {
      const fid = parseInt(req.params.fid, 10);
      const building = await Building.findOne({
        where: { fid: { [Op.eq]: fid } },
        include: { all: true },
      });
      if (building) {
        const response = this.parseBuildingToUnrealData(building);
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: 'Building unreal not found' });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to retrieve building unreal' });
    }
  }

  setResponseHeaders(req: Request, res: Response, total: Number) {
    if (req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range
        .replace(/buildings=/, '')
        .split('-');
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total;
      res.setHeader(
        'Content-Range',
        `buildings ${start}-${end}/${total}`
      );
      res.setHeader('Accept-Ranges', 'buildings');
    }
  }

  setPagination(req: Request) {
    if (req.headers.range) {
      const range = req.headers.range;
      const [partialStart = '0', partialEnd] = range
        .replace(/buildings=/, '')
        .split('-');
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : 10;
      const { sort, filter }: any = req.query;
      const order = sort ? [JSON.parse(sort)] : [];
      return {
        order,
        limit: end - start + 1,
        offset: start,
      };
    }
    return {};
  }

  getBuildingInterventions(
    buildingId: number,
    interventions: number[]
  ) {
    return interventions.map((i: number) => ({
      BuildingId: buildingId,
      InterventionId: i,
    }));
  }

  interventionsHasChanged(
    buildingInterventions: BuildingIntervention[],
    interventions: number[]
  ) {
    return (
      buildingInterventions &&
      buildingInterventions.filter(
        (bi) => !interventions.includes(bi.InterventionId)
      ).length > 0
    );
  }

  filterInterventions(req: Request) {
    return req.query.Interventions
      ? [...req.query.Interventions.toString().split(',')]
      : req.query.Interventions === ''
      ? []
      : undefined;
  }

  getBuildingConservations(
    buildingId: number,
    conservations: number[]
  ) {
    return conservations.map((i: number) => ({
      BuildingId: buildingId,
      ConservationId: i,
    }));
  }

  conservationsHasChanged(
    buildingConservations: BuildingConservation[],
    conservations: number[]
  ) {
    return (
      buildingConservations &&
      buildingConservations.filter(
        (bc) => !conservations.includes(bc.ConservationId)
      ).length > 0
    );
  }

  filterConservations(req: Request) {
    return req.query.Conservations
      ? [...req.query.Conservations.toString().split(',')]
      : req.query.Conservations === ''
      ? []
      : undefined;
  }

  parseBuildingToUnrealData(building: Building) {
    const {
      fid,
      buildingId,
      floors,
      index,
      isCulturalHeritage,
      isCulturallySignificantArea,
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
      Conservations = [],
    } = building;
    return {
      fid,
      buildingId,
      floors,
      index,
      culturalHeritage: isCulturalHeritage ? 'yes' : 'no',
      culturallySignificantArea: isCulturallySignificantArea
        ? 'yes'
        : 'no',
      opening: Opening?.description,
      structuralSystem: StructuralSystem?.description,
      wallCovering: WallCovering?.description,
      roofCovering: RoofCovering?.description,
      useType: UseType?.description,
      currentState: CurrentState?.description,
      conservationLevel: ConservationLevel?.description,
      architectonicAdequacy: ArchitectonicAdequacy?.description,
      facadeTypology: FacadeTypology?.description,
      interventions:
        Interventions.length > 0
          ? Interventions.map((i) => i.description)
          : Interventions,
      conservations:
        Conservations.length > 0
          ? Conservations.map((c) => c.description)
          : Conservations,
    };
  }
}

export default BuildingService;
