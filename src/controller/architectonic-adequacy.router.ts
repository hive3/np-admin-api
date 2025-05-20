import express, { Request, Response } from 'express';
import ArchitectonicAdequacyService from '../service/architectonic-adequacy.service';

const router = express.Router();
const service = new ArchitectonicAdequacyService();

router.get(
  '/architectonic-adequacies',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Architectonic Adequacies']
    // #swagger.summary = 'Gets all Architectonic Adequacies'
    // #swagger.description = 'Endpoint to get all existent Architectonic Adequacies.'
    /* #swagger.responses[200] = {
        description: 'Successful operation.',
        schema: [{$ref: '#/components/schemas/ArchitectonicAdequacy'}]
    } */
    /* #swagger.responses[404] = {
        description: 'Architectonic Adequacies not found.'
    } */
    /* #swagger.responses[500] = {
        description: 'Failed to retrieve Architectonic Adequacies.'
    } */
    return service.getArchitectonicAdequacies(req, res);
  }
);

router.get(
  '/architectonic-adequacies/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Architectonic Adequacies']
    // #swagger.summary = 'Gets a specific Architectonic Adequacy'
    // #swagger.description = 'Endpoint to get a specific Architectonic Adequacy by their ID.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Architectonic Adequacy ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.responses[200] = {
        description: 'Architectonic Adequacy found.',
        schema: { $ref: '#/components/schemas/ArchitectonicAdequacy' }
    } */
    /* #swagger.responses[404] = {
        description: 'Architectonic Adequacy not found.'
    } */
    /* #swagger.responses[500] = {
        description: 'Failed to retrieve Architectonic Adequacy.'
    } */
    return service.getArchitectonicAdequacyById(req, res);
  }
);

router.post(
  '/architectonic-adequacies',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Architectonic Adequacies']
    // #swagger.summary = 'Creates a new Architectonic Adequacy'
    // #swagger.description = 'Endpoint to create a new Architectonic Adequacy.'
    /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/ArchitectonicAdequacy" }
              }
          }
    } */
    /* #swagger.responses[201] = {
          description: 'Architectonic Adequacy created successfully.',
          schema: { $ref: '#/components/schemas/ArchitectonicAdequacy' }
    } */
    /* #swagger.responses[500] = {
          description:  'Failed to create Architectonic Adequacy'
    } */
    return service.create(req, res);
  }
);

router.put(
  '/architectonic-adequacies/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Architectonic Adequacies']
    // #swagger.summary = 'Updates an existent Architectonic Adequacy'
    // #swagger.description = 'Endpoint to update a Architectonic Adequacy.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Architectonic Adequacies ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/ArchitectonicAdequacy" }
              }
          }
    } */
    /* #swagger.responses[200] = {
          description: 'Architectonic Adequacies updated successfully.',
          schema: { $ref: '#/components/schemas/ArchitectonicAdequacy' }
    } */
    /* #swagger.responses[404] = {
          description:  'Architectonic Adequacy not found or update failed'
    } */
    /* #swagger.responses[500] = {
          description:  'Failed to update Architectonic Adequacy'
    } */
    service.update(req, res);
  }
);

router.delete(
  '/architectonic-adequacies/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Architectonic Adequacies']
    // #swagger.summary = 'Deletes a Architectonic Adequacy'
    // #swagger.description = 'Deletes a Architectonic Adequacy by their ID.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Architectonic Adequacy ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.responses[204] = {
          description: 'No content.'
    } */
    /* #swagger.responses[404] = {
          description: 'Architectonic Adequacy cannot be deleted buildings associated: [xxxx, xxxx].'
    } */
    /* #swagger.responses[404] = {
          description: 'Architectonic Adequacy not found or deletion failed.'
    } */
    /* #swagger.responses[500] = {
          description: 'Failed to delete Architectonic Adequacy.'
    } */
    service.delete(req, res);
  }
);

export default router;
