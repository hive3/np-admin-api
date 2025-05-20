import express, { Request, Response } from 'express';
import BuildingService from '../service/building.service';

const router = express.Router();
const service = new BuildingService();

router.get('/buildings', async (req: Request, res: Response) => {
  // #swagger.tags = ['Buildings']
  // #swagger.summary = 'Gets all buildings'
  // #swagger.description = 'Endpoint to get all existent buildings.'
  /* #swagger.responses[200] = {
        description: 'Successful operation.',
        schema: [{ $ref: '#/components/schemas/Building' }]
  } */
  /* #swagger.responses[404] = {
        description: 'Buildings not found.'
  } */
  /* #swagger.responses[500] = {
        description: 'Failed to retrieve buildings.'
  } */
  return service.getBuildings(req, res);
});

router.get('/buildings/:id', async (req: Request, res: Response) => {
  // #swagger.tags = ['Buildings']
  // #swagger.summary = 'Gets a specific building'
  // #swagger.description = 'Endpoint to get a specific building by their ID.'
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Building ID.',
        required: true,
        type: 'integer'
  } */
  /* #swagger.responses[200] = {
        description: 'Building found.',
        schema: { $ref: '#/components/schemas/Building' }
  } */
  /* #swagger.responses[404] = {
        description: 'Building not found.'
  } */
  /* #swagger.responses[500] = {
        description: 'Failed to retrieve building.'
  } */
  return service.getBuildingById(req, res);
});

router.post('/buildings', async (req: Request, res: Response) => {
  // #swagger.tags = ['Buildings']
  // #swagger.summary = 'Creates a new building'
  // #swagger.description = 'Endpoint to create a new building.'
  /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/BuildingDTO" }
              }
          }
    } */
  /* #swagger.responses[201] = {
          description: 'Building created successfully.',
          schema: { $ref: '#/components/schemas/Building' }
    } */
  /* #swagger.responses[500] = {
          description:  'Failed to create building'
    } */
  return service.createBuilding(req, res);
});

router.put('/buildings/:id', async (req: Request, res: Response) => {
  // #swagger.tags = ['Buildings']
  // #swagger.summary = 'Updates an existent building'
  // #swagger.description = 'Endpoint to update a building.'
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Building ID.',
        required: true,
        type: 'integer'
  } */
  /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/BuildingDTO" }
              }
          }
    } */
  /* #swagger.responses[200] = {
          description: 'Building updated successfully.',
          schema: { $ref: '#/components/schemas/Building' }
    } */
  /* #swagger.responses[404] = {
          description:  'Building not found or update failed'
    } */
  /* #swagger.responses[500] = {
          description:  'Failed to update building'
    } */
  service.updateBuilding(req, res);
});

router.delete(
  '/buildings/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Buildings']
    // #swagger.summary = 'Deletes a building'
    // #swagger.description = 'Deletes a building by their ID.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Building ID.',
        required: true,
        type: 'integer'
  } */
    /* #swagger.responses[204] = {
          description: 'No content.'
    } */
    /* #swagger.responses[404] = {
          description: 'Building not found or deletion failed.'
    } */
    /* #swagger.responses[500] = {
          description: 'Failed to delete building.'
    } */
    service.deleteBuilding(req, res);
  }
);

router.get(
  '/unreal/buildings',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Unreal']
    // #swagger.summary = 'Gets all Unreal buildings'
    // #swagger.description = 'Endpoint to get all existent Unreal buildings that contains fid.'
    /* #swagger.responses[200] = {
        description: 'Successful operation.',
        schema: [{"$ref": '#/components/schemas/UnrealBuilding'}]
    } */
    /* #swagger.responses[404] = {
        description: 'Buildings not found.'
    } */
    /* #swagger.responses[500] = {
        description: 'Failed to retrieve buildings.'
    } */
    service.getUnrealBuildingsData(req, res);
  }
);

router.get('/unreal/fids', async (req: Request, res: Response) => {
  // #swagger.tags = ['Unreal']
  // #swagger.summary = 'Gets all the fids of the existent buildings'
  // #swagger.description = 'Endpoint to get all the fids of the existent buildings.'
  /* #swagger.responses[200] = {
        description: 'Successful operation.',
        schema: [123]
  } */
  /* #swagger.responses[404] = {
        description: 'Unreal Building not found.'
  } */
  /* #swagger.responses[500] = {
        description: 'Failed to retrieve Unreal building'
  } */
  service.getUnrealBuildingsFidData(req, res);
});

router.get(
  '/unreal/buildings/:fid',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Unreal']
    // #swagger.summary = 'Gets a specific building by fid'
    // #swagger.description = 'Endpoint to get a specific building by their fid.'
    /* #swagger.parameters['fid'] = {
        in: 'path',
        description: 'Building fid.',
        required: true,
        type: 'integer'
  } */
    /* #swagger.responses[200] = {
        description: 'Building found.',
        schema: { $ref: '#/components/schemas/UnrealBuilding' }
  } */
    /* #swagger.responses[404] = {
        description: 'Building unreal not found'
  } */
    /* #swagger.responses[500] = {
        description: 'Failed to retrieve building unreal'
  } */
    service.getUnrealBuildingDataByFid(req, res);
  }
);

export default router;
