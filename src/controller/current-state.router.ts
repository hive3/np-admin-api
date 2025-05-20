import express, { Request, Response } from 'express';
import CurrentStateService from '../service/current-state.service';

const router = express.Router();
const service = new CurrentStateService();

router.get('/current-states', async (req: Request, res: Response) => {
  // #swagger.tags = ['Current States']
  // #swagger.summary = 'Gets all Current States'
  // #swagger.description = 'Endpoint to get all existent Current States.'
  /* #swagger.responses[200] = {
        description: 'Successful operation.',
        schema: [{$ref: '#/components/schemas/CurrentState'}]
    } */
  /* #swagger.responses[404] = {
        description: 'Current States not found.'
    } */
  /* #swagger.responses[500] = {
        description: 'Failed to retrieve Current States.'
  } */
  return service.getCurrentStates(req, res);
});

router.get(
  '/current-states/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Current States']
    // #swagger.summary = 'Gets a specific Current State'
    // #swagger.description = 'Endpoint to get a specific Current State by their ID.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Current State ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.responses[200] = {
        description: 'Current State found.',
        schema: { $ref: '#/components/schemas/CurrentState' }
    } */
    /* #swagger.responses[404] = {
        description: 'Current State not found.'
    } */
    /* #swagger.responses[500] = {
        description: 'Failed to retrieve Current State.'
    } */
    return service.getCurrentStateById(req, res);
  }
);

router.post(
  '/current-states',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Current States']
    // #swagger.summary = 'Creates a new Current State'
    // #swagger.description = 'Endpoint to create a new Current State.'
    /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/CurrentState" }
              }
          }
    } */
    /* #swagger.responses[201] = {
          description: 'Current State created successfully.',
          schema: { $ref: '#/components/schemas/CurrentState' }
    } */
    /* #swagger.responses[500] = {
          description:  'Failed to create Current State'
    } */
    return service.create(req, res);
  }
);

router.put(
  '/current-states/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Current States']
    // #swagger.summary = 'Updates an existent Current State'
    // #swagger.description = 'Endpoint to update a Current State.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Current States ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/CurrentState" }
              }
          }
    } */
    /* #swagger.responses[200] = {
          description: 'Current State updated successfully.',
          schema: { $ref: '#/components/schemas/CurrentState' }
    } */
    /* #swagger.responses[404] = {
          description:  'Current State not found or update failed'
    } */
    /* #swagger.responses[500] = {
          description:  'Failed to update Current State'
    } */
    service.update(req, res);
  }
);

router.delete(
  '/current-states/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Current States']
    // #swagger.summary = 'Deletes a Current State'
    // #swagger.description = 'Deletes a Current State by their ID.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Current State ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.responses[204] = {
          description: 'No content.'
    } */
    /* #swagger.responses[404] = {
          description: 'Current State cannot be deleted buildings associated: [xxxx, xxxx].'
    } */
    /* #swagger.responses[404] = {
          description: 'Current State not found or deletion failed.'
    } */
    /* #swagger.responses[500] = {
          description: 'Failed to delete Current State.'
    } */
    service.delete(req, res);
  }
);

export default router;
