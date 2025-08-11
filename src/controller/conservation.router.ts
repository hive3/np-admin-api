import express, { Request, Response } from 'express';
import ConservationService from '../service/conservation.service';

const router = express.Router();
const service = new ConservationService();

router.get('/conservations', async (req: Request, res: Response) => {
  // #swagger.tags = ['Conservations']
  // #swagger.summary = 'Gets all Conservations'
  // #swagger.description = 'Endpoint to get all existent Conservations.'
  /* #swagger.responses[200] = {
        description: 'Successful operation.',
        schema: [{$ref: '#/components/schemas/Conservations'}]
    } */
  /* #swagger.responses[404] = {
        description: 'Conservations not found.'
    } */
  /* #swagger.responses[500] = {
        description: 'Failed to retrieve Conservations.'
  } */
  return service.getConservations(req, res);
});

router.get(
  '/conservations/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Conservations']
    // #swagger.summary = 'Gets a specific Conservation'
    // #swagger.description = 'Endpoint to get a specific Conservation by their ID.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Conservation ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.responses[200] = {
        description: 'Conservation found.',
        schema: { $ref: '#/components/schemas/Conservation' }
    } */
    /* #swagger.responses[404] = {
        description: 'Conservation not found.'
    } */
    /* #swagger.responses[500] = {
        description: 'Failed to retrieve Conservation.'
  } */
    return service.getConservationById(req, res);
  }
);

router.post('/conservations', async (req: Request, res: Response) => {
  // #swagger.tags = ['Conservations']
  // #swagger.summary = 'Creates a new Conservation'
  // #swagger.description = 'Endpoint to create a new Conservation.'
  /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/Conservation" }
              }
          }
    } */
  /* #swagger.responses[201] = {
          description: 'Conservation created successfully.',
          schema: { $ref: '#/components/schemas/Conservation' }
    } */
  /* #swagger.responses[500] = {
          description:  'Failed to create Conservation'
    } */
  return service.create(req, res);
});

router.put(
  '/conservations/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Conservations']
    // #swagger.summary = 'Updates an existent Conservation'
    // #swagger.description = 'Endpoint to update a Conservation.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Conservation ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/Conservation" }
              }
          }
    } */
    /* #swagger.responses[200] = {
          description: 'Conservation updated successfully.',
          schema: { $ref: '#/components/schemas/Conservation' }
    } */
    /* #swagger.responses[404] = {
          description:  'Conservation not found or update failed'
    } */
    /* #swagger.responses[500] = {
          description:  'Failed to update Conservation'
    } */
    service.update(req, res);
  }
);

router.delete(
  '/conservations/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Conservations']
    // #swagger.summary = 'Deletes a Conservation'
    // #swagger.description = 'Deletes a Conservation by their ID.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Conservation ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.responses[204] = {
          description: 'No content.'
    } */
    /* #swagger.responses[404] = {
          description: 'Conservation cannot be deleted buildings associated: [xxxx, xxxx].'
    } */
    /* #swagger.responses[404] = {
          description: 'Conservation not found or deletion failed.'
    } */
    /* #swagger.responses[500] = {
          description: 'Failed to delete Conservation.'
    } */
    service.delete(req, res);
  }
);

export default router;
