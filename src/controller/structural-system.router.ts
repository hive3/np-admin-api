import express, { Request, Response } from 'express';
import StructuralSystemService from '../service/structural-system.service';

const router = express.Router();
const service = new StructuralSystemService();

router.get(
  '/structural-systems',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Structural Systems']
    // #swagger.summary = 'Gets all Structural Systems'
    // #swagger.description = 'Endpoint to get all existent Structural Systems.'
    /* #swagger.responses[200] = {
        description: 'Successful operation.',
        schema: [{$ref: '#/components/schemas/StructuralSystem'}]
    } */
    /* #swagger.responses[404] = {
        description: 'Structural Systems not found.'
    } */
    /* #swagger.responses[500] = {
        description: 'Failed to retrieve Structural Systems.'
    } */
    return service.getStructuralSystems(req, res);
  }
);

router.get(
  '/structural-systems/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Structural Systems']
    // #swagger.summary = 'Gets a specific Structural System'
    // #swagger.description = 'Endpoint to get a specific Structural System by their ID.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Structural System ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.responses[200] = {
        description: 'Structural System found.',
        schema: { $ref: '#/components/schemas/StructuralSystem' }
    } */
    /* #swagger.responses[404] = {
        description: 'Structural System not found.'
    } */
    /* #swagger.responses[500] = {
        description: 'Failed to retrieve Structural System.'
    } */
    return service.getStructuralSystemById(req, res);
  }
);

router.post(
  '/structural-systems',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Structural Systems']
    // #swagger.summary = 'Creates a new Structural System'
    // #swagger.description = 'Endpoint to create a new Structural System.'
    /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/StructuralSystem" }
              }
          }
    } */
    /* #swagger.responses[201] = {
          description: 'Structural System created successfully.',
          schema: { $ref: '#/components/schemas/StructuralSystem' }
    } */
    /* #swagger.responses[500] = {
          description:  'Failed to create Structural System'
    } */
    return service.create(req, res);
  }
);

router.put(
  '/structural-systems/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Structural Systems']
    // #swagger.summary = 'Updates an existent Structural System'
    // #swagger.description = 'Endpoint to update a Structural System.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Structural System ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/StructuralSystem" }
              }
          }
    } */
    /* #swagger.responses[200] = {
          description: 'Structural System updated successfully.',
          schema: { $ref: '#/components/schemas/StructuralSystem' }
    } */
    /* #swagger.responses[404] = {
          description:  'Structural System not found or update failed'
    } */
    /* #swagger.responses[500] = {
          description:  'Failed to update Structural System'
    } */
    service.update(req, res);
  }
);

router.delete(
  '/structural-systems/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Structural Systems']
    // #swagger.summary = 'Deletes a Structural System'
    // #swagger.description = 'Deletes a Structural System by their ID.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Structural System ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.responses[204] = {
          description: 'No content.'
    } */
    /* #swagger.responses[404] = {
          description: 'Structural System cannot be deleted buildings associated: [xxxx, xxxx].'
    } */
    /* #swagger.responses[404] = {
          description: 'Structural System not found or deletion failed.'
    } */
    /* #swagger.responses[500] = {
          description: 'Failed to delete Structural System.'
    } */
    service.delete(req, res);
  }
);

export default router;
