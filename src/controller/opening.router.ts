import express, { Request, Response } from 'express';
import OpeningService from '../service/opening.service';

const router = express.Router();
const service = new OpeningService();

router.get('/openings', async (req: Request, res: Response) => {
  // #swagger.tags = ['Openings']
  // #swagger.summary = 'Gets all Openings'
  // #swagger.description = 'Endpoint to get all existent Openings.'
  /* #swagger.responses[200] = {
        description: 'Successful operation.',
        schema: [{$ref: '#/components/schemas/Opening'}]
    } */
  /* #swagger.responses[404] = {
        description: 'Openings not found.'
    } */
  /* #swagger.responses[500] = {
        description: 'Failed to retrieve Openings.'
  } */
  return service.getOpenings(req, res);
});

router.get('/openings/:id', async (req: Request, res: Response) => {
  // #swagger.tags = ['Openings']
  // #swagger.summary = 'Gets a specific Opening'
  // #swagger.description = 'Endpoint to get a specific Opening by their ID.'
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Opening ID.',
        required: true,
        type: 'integer'
    } */
  /* #swagger.responses[200] = {
        description: 'Opening found.',
        schema: { $ref: '#/components/schemas/Opening' }
    } */
  /* #swagger.responses[404] = {
        description: 'Openings not found.'
    } */
  /* #swagger.responses[500] = {
        description: 'Failed to retrieve Opening.'
  } */
  return service.getOpeningById(req, res);
});

router.post(
  '/openings',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Openings']
    // #swagger.summary = 'Creates a new Opening'
    // #swagger.description = 'Endpoint to create a new Opening.'
    /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/Opening" }
              }
          }
    } */
    /* #swagger.responses[201] = {
          description: 'Opening created successfully.',
          schema: { $ref: '#/components/schemas/Opening' }
    } */
    /* #swagger.responses[500] = {
          description:  'Failed to create Opening'
    } */
    return service.create(req, res);
  }
);

router.put(
  '/openings/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Openings']
    // #swagger.summary = 'Updates an existent Opening'
    // #swagger.description = 'Endpoint to update a Opening.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Opening ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/Opening" }
              }
          }
    } */
    /* #swagger.responses[200] = {
          description: 'Opening updated successfully.',
          schema: { $ref: '#/components/schemas/Opening' }
    } */
    /* #swagger.responses[404] = {
          description:  'Opening not found or update failed'
    } */
    /* #swagger.responses[500] = {
          description:  'Failed to update Opening'
    } */
    service.update(req, res);
  }
);

router.delete(
  '/openings/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Openings']
    // #swagger.summary = 'Deletes a Opening'
    // #swagger.description = 'Deletes a Opening by their ID.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Opening ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.responses[204] = {
          description: 'No content.'
    } */
    /* #swagger.responses[404] = {
          description: 'Opening cannot be deleted buildings associated: [xxxx, xxxx].'
    } */
    /* #swagger.responses[404] = {
          description: 'Opening not found or deletion failed.'
    } */
    /* #swagger.responses[500] = {
          description: 'Failed to delete Opening.'
    } */
    service.delete(req, res);
  }
);

export default router;
