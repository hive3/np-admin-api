import express, { Request, Response } from 'express';
import InterventionService from '../service/intervention.service';

const router = express.Router();
const service = new InterventionService();

router.get('/interventions', async (req: Request, res: Response) => {
  // #swagger.tags = ['Interventions']
  // #swagger.summary = 'Gets all Interventions'
  // #swagger.description = 'Endpoint to get all existent Interventions.'
  /* #swagger.responses[200] = {
        description: 'Successful operation.',
        schema: [{$ref: '#/components/schemas/Intervention'}]
    } */
  /* #swagger.responses[404] = {
        description: 'Interventions not found.'
    } */
  /* #swagger.responses[500] = {
        description: 'Failed to retrieve Interventions.'
  } */
  return service.getInterventions(req, res);
});

router.get(
  '/interventions/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Interventions']
    // #swagger.summary = 'Gets a specific Intervention'
    // #swagger.description = 'Endpoint to get a specific Intervention by their ID.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Intervention ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.responses[200] = {
        description: 'Intervention found.',
        schema: { $ref: '#/components/schemas/Intervention' }
    } */
    /* #swagger.responses[404] = {
        description: 'Intervention not found.'
    } */
    /* #swagger.responses[500] = {
        description: 'Failed to retrieve Intervention.'
  } */
    return service.getInterventionById(req, res);
  }
);

router.post('/interventions', async (req: Request, res: Response) => {
  // #swagger.tags = ['Interventions']
  // #swagger.summary = 'Creates a new Intervention'
  // #swagger.description = 'Endpoint to create a new Intervention.'
  /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/Intervention" }
              }
          }
    } */
  /* #swagger.responses[201] = {
          description: 'Intervention created successfully.',
          schema: { $ref: '#/components/schemas/Intervention' }
    } */
  /* #swagger.responses[500] = {
          description:  'Failed to create Intervention'
    } */
  return service.create(req, res);
});

router.put(
  '/interventions/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Interventions']
    // #swagger.summary = 'Updates an existent Intervention'
    // #swagger.description = 'Endpoint to update a Intervention.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Intervention ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/Intervention" }
              }
          }
    } */
    /* #swagger.responses[200] = {
          description: 'Intervention updated successfully.',
          schema: { $ref: '#/components/schemas/Intervention' }
    } */
    /* #swagger.responses[404] = {
          description:  'Intervention not found or update failed'
    } */
    /* #swagger.responses[500] = {
          description:  'Failed to update Intervention'
    } */
    service.update(req, res);
  }
);

router.delete(
  '/interventions/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Interventions']
    // #swagger.summary = 'Deletes a Intervention'
    // #swagger.description = 'Deletes a Intervention by their ID.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Intervention ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.responses[204] = {
          description: 'No content.'
    } */
    /* #swagger.responses[404] = {
          description: 'Intervention cannot be deleted buildings associated: [xxxx, xxxx].'
    } */
    /* #swagger.responses[404] = {
          description: 'Intervention not found or deletion failed.'
    } */
    /* #swagger.responses[500] = {
          description: 'Failed to delete Intervention.'
    } */
    service.delete(req, res);
  }
);

export default router;
