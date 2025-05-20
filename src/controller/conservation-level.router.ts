import express, { Request, Response } from 'express';
import ConservationLevelService from '../service/conservation-level.service';

const router = express.Router();
const service = new ConservationLevelService();

router.get(
  '/conservation-levels',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Conservation Levels']
    // #swagger.summary = 'Gets all Conservation Levels'
    // #swagger.description = 'Endpoint to get all existent Conservation Levels.'
    /* #swagger.responses[200] = {
        description: 'Successful operation.',
        schema: [{$ref: '#/components/schemas/ConservationLevel'}]
    } */
    /* #swagger.responses[404] = {
        description: 'Conservation Level not found.'
    } */
    /* #swagger.responses[500] = {
        description: 'Failed to retrieve Conservation Level.'
    } */
    return service.getConservationLevels(req, res);
  }
);

router.get(
  '/conservation-levels/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Conservation Levels']
    // #swagger.summary = 'Gets a specific Conservation Level'
    // #swagger.description = 'Endpoint to get a specific Conservation Level by their ID.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Conservation Level ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.responses[200] = {
        description: 'Conservation Level found.',
        schema: { $ref: '#/components/schemas/ConservationLevel' }
    } */
    /* #swagger.responses[404] = {
        description: 'Conservation Level not found.'
    } */
    /* #swagger.responses[500] = {
        description: 'Failed to retrieve Conservation Level.'
    } */
    return service.getConservationLevelById(req, res);
  }
);

router.post(
  '/conservation-levels',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Conservation Levels']
    // #swagger.summary = 'Creates a new Conservation Level'
    // #swagger.description = 'Endpoint to create a new Conservation Level.'
    /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/ConservationLevel" }
              }
          }
    } */
    /* #swagger.responses[201] = {
          description: 'Architectonic Adequacy created successfully.',
          schema: { $ref: '#/components/schemas/ConservationLevel' }
    } */
    /* #swagger.responses[500] = {
          description:  'Failed to create Conservation Level'
    } */
    return service.create(req, res);
  }
);

router.put(
  '/conservation-levels/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Conservation Levels']
    // #swagger.summary = 'Updates an existent Conservation Level'
    // #swagger.description = 'Endpoint to update a Conservation Level.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Conservation Level ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/ConservationLevel" }
              }
          }
    } */
    /* #swagger.responses[200] = {
          description: 'Conservation Level updated successfully.',
          schema: { $ref: '#/components/schemas/ConservationLevel' }
    } */
    /* #swagger.responses[404] = {
          description:  'Conservation Level not found or update failed'
    } */
    /* #swagger.responses[500] = {
          description:  'Failed to update Conservation Level'
    } */
    service.update(req, res);
  }
);

router.delete(
  '/conservation-levels/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Conservation Levels']
    // #swagger.summary = 'Deletes a Conservation Level'
    // #swagger.description = 'Deletes a Conservation Level by their ID.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Conservation Level ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.responses[204] = {
          description: 'No content.'
    } */
    /* #swagger.responses[404] = {
          description: 'Conservation Level cannot be deleted buildings associated: [xxxx, xxxx].'
    } */
    /* #swagger.responses[404] = {
          description: 'Conservation Level not found or deletion failed.'
    } */
    /* #swagger.responses[500] = {
          description: 'Failed to delete Conservation Level.'
    } */
    service.delete(req, res);
  }
);

export default router;
