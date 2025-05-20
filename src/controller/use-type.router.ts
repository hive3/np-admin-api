import express, { Request, Response } from 'express';
import UseTypeService from '../service/use-type.service';

const router = express.Router();
const service = new UseTypeService();

router.get('/use-types', async (req: Request, res: Response) => {
  // #swagger.tags = ['Use Types']
  // #swagger.summary = 'Gets all Use Types'
  // #swagger.description = 'Endpoint to get all existent Use Types.'
  /* #swagger.responses[200] = {
        description: 'Successful operation.',
        schema: [{$ref: '#/components/schemas/UseType'}]
    } */
  /* #swagger.responses[404] = {
        description: 'Use Types not found.'
    } */
  /* #swagger.responses[500] = {
        description: 'Failed to retrieve Use Types.'
  } */
  return service.getUseTypes(req, res);
});

router.get('/use-types/:id', async (req: Request, res: Response) => {
  // #swagger.tags = ['Use Types']
  // #swagger.summary = 'Gets a specific Use Type'
  // #swagger.description = 'Endpoint to get a specific Use Type by their ID.'
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Use Type ID.',
        required: true,
        type: 'integer'
    } */
  /* #swagger.responses[200] = {
        description: 'Use Type found.',
        schema: { $ref: '#/components/schemas/UseType' }
    } */
  /* #swagger.responses[404] = {
        description: 'Use Type not found.'
    } */
  /* #swagger.responses[500] = {
        description: 'Failed to retrieve Use Type.'
    } */
  return service.getUseTypeById(req, res);
});

router.post('/use-types', async (req: Request, res: Response) => {
  // #swagger.tags = ['Use Types']
  // #swagger.summary = 'Creates a new Use Type'
  // #swagger.description = 'Endpoint to create a new Use Type.'
  /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/UseType" }
              }
          }
    } */
  /* #swagger.responses[201] = {
          description: 'Use Type created successfully.',
          schema: { $ref: '#/components/schemas/UseType' }
    } */
  /* #swagger.responses[500] = {
          description:  'Failed to create Use Type'
    } */
  return service.create(req, res);
});

router.put('/use-types/:id', async (req: Request, res: Response) => {
  // #swagger.tags = ['Use Types']
  // #swagger.summary = 'Updates an existent Use Type'
  // #swagger.description = 'Endpoint to update an Use Type.'
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Use Type ID.',
        required: true,
        type: 'integer'
    } */
  /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/UseType" }
              }
          }
    } */
  /* #swagger.responses[200] = {
          description: 'Use Type updated successfully.',
          schema: { $ref: '#/components/schemas/UseType' }
    } */
  /* #swagger.responses[404] = {
          description:  'Use Type not found or update failed'
    } */
  /* #swagger.responses[500] = {
          description:  'Failed to update Use Type'
    } */
  service.update(req, res);
});

router.delete(
  '/use-types/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Use Types']
    // #swagger.summary = 'Deletes an Use Type'
    // #swagger.description = 'Deletes an Use Type by their ID.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Use Type ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.responses[204] = {
          description: 'No content.'
    } */
    /* #swagger.responses[404] = {
          description: 'Use Type cannot be deleted buildings associated: [xxxx, xxxx].'
    } */
    /* #swagger.responses[404] = {
          description: 'Use Type not found or deletion failed.'
    } */
    /* #swagger.responses[500] = {
          description: 'Failed to delete Use Type.'
    } */
    service.delete(req, res);
  }
);

export default router;
