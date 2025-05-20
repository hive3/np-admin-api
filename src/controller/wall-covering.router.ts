import express, { Request, Response } from 'express';
import WallCoveringService from '../service/wall-covering.service';

const router = express.Router();
const service = new WallCoveringService();

router.get('/wall-coverings', async (req: Request, res: Response) => {
  // #swagger.tags = ['Wall Coverings']
  // #swagger.summary = 'Gets all Wall Coverings'
  // #swagger.description = 'Endpoint to get all existent Wall Coverings.'
  /* #swagger.responses[200] = {
        description: 'Successful operation.',
        schema: [{$ref: '#/components/schemas/WallCovering'}]
    } */
  /* #swagger.responses[404] = {
        description: 'Wall Coverings not found.'
    } */
  /* #swagger.responses[500] = {
        description: 'Failed to retrieve Wall Coverings.'
  } */
  return service.getWallCoverings(req, res);
});

router.get(
  '/wall-coverings/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Wall Coverings']
    // #swagger.summary = 'Gets a specific Roof Covering'
    // #swagger.description = 'Endpoint to get a specific Roof Covering by their ID.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Roof Covering ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.responses[200] = {
        description: 'Roof Covering found.',
        schema: { $ref: '#/components/schemas/RoofCovering' }
    } */
    /* #swagger.responses[404] = {
        description: 'Roof Covering not found.'
    } */
    /* #swagger.responses[500] = {
        description: 'Failed to retrieve Roof Covering.'
   } */
    return service.getWallCoveringById(req, res);
  }
);

router.post(
  '/wall-coverings',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Wall Coverings']
    // #swagger.summary = 'Creates a new Wall Covering'
    // #swagger.description = 'Endpoint to create a new Wall Covering.'
    /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/WallCovering" }
              }
          }
    } */
    /* #swagger.responses[201] = {
          description: 'Wall Covering created successfully.',
          schema: { $ref: '#/components/schemas/WallCovering' }
    } */
    /* #swagger.responses[500] = {
          description:  'Failed to create Wall Covering'
    } */
    return service.create(req, res);
  }
);

router.put(
  '/wall-coverings/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Wall Coverings']
    // #swagger.summary = 'Updates an existent Wall Covering'
    // #swagger.description = 'Endpoint to update a Wall Covering.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Wall Covering ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/WallCovering" }
              }
          }
    } */
    /* #swagger.responses[200] = {
          description: 'Wall Covering updated successfully.',
          schema: { $ref: '#/components/schemas/WallCovering' }
    } */
    /* #swagger.responses[404] = {
          description:  'Wall Covering not found or update failed'
    } */
    /* #swagger.responses[500] = {
          description:  'Failed to update Wall Covering'
    } */
    service.update(req, res);
  }
);

router.delete(
  '/wall-coverings/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Wall Coverings']
    // #swagger.summary = 'Deletes a Wall Covering'
    // #swagger.description = 'Deletes a Wall Covering by their ID.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Wall Covering ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.responses[204] = {
          description: 'No content.'
    } */
    /* #swagger.responses[404] = {
          description: 'Wall Covering cannot be deleted buildings associated: [xxxx, xxxx].'
    } */
    /* #swagger.responses[404] = {
          description: 'Wall Covering not found or deletion failed.'
    } */
    /* #swagger.responses[500] = {
          description: 'Failed to delete Wall Covering.'
    } */
    service.delete(req, res);
  }
);

export default router;
