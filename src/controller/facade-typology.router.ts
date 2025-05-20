import express, { Request, Response } from 'express';
import FacadeTypologyService from '../service/facade-typology.service';

const router = express.Router();
const service = new FacadeTypologyService();

router.get(
  '/facade-typologies',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Facade Typologies']
    // #swagger.summary = 'Gets all Facade Typologies'
    // #swagger.description = 'Endpoint to get all existent Facade Typologies.'
    /* #swagger.responses[200] = {
        description: 'Successful operation.',
        schema: [{$ref: '#/components/schemas/FacadeTypology'}]
    } */
    /* #swagger.responses[404] = {
        description: 'Facade Typologies not found.'
    } */
    /* #swagger.responses[500] = {
        description: 'Failed to retrieve Facade Typologies.'
  } */
    return service.getFacadeTypologies(req, res);
  }
);

router.get(
  '/facade-typologies/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Facade Typologies']
    // #swagger.summary = 'Gets a specific Facade Typology'
    // #swagger.description = 'Endpoint to get a specific Facade Typology by their ID.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Facade Typology ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.responses[200] = {
        description: 'Current State found.',
        schema: { $ref: '#/components/schemas/FacadeTypology' }
    } */
    /* #swagger.responses[404] = {
        description: 'Facade Typology not found.'
    } */
    /* #swagger.responses[500] = {
        description: 'Failed to retrieve Facade Typology.'
    } */
    return service.getFacadeTypologyById(req, res);
  }
);

router.post(
  '/facade-typologies',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Facade Typologies']
    // #swagger.summary = 'Creates a new Facade Typology'
    // #swagger.description = 'Endpoint to create a new Facade Typology.'
    /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/FacadeTypology" }
              }
          }
    } */
    /* #swagger.responses[201] = {
          description: 'Facade Typology created successfully.',
          schema: { $ref: '#/components/schemas/FacadeTypology' }
    } */
    /* #swagger.responses[500] = {
          description:  'Failed to create Facade Typology'
    } */
    return service.create(req, res);
  }
);

router.put(
  '/facade-typologies/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Facade Typologies']
    // #swagger.summary = 'Updates an existent Facade Typology'
    // #swagger.description = 'Endpoint to update a Facade Typology.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Facade Typology ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/FacadeTypology" }
              }
          }
    } */
    /* #swagger.responses[200] = {
          description: 'Facade Typology updated successfully.',
          schema: { $ref: '#/components/schemas/FacadeTypology' }
    } */
    /* #swagger.responses[404] = {
          description:  'Facade Typology not found or update failed'
    } */
    /* #swagger.responses[500] = {
          description:  'Failed to update Facade Typology'
    } */
    service.update(req, res);
  }
);

router.delete(
  '/facade-typologies/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Facade Typologies']
    // #swagger.summary = 'Deletes a Facade Typology'
    // #swagger.description = 'Deletes a Facade Typology by their ID.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Facade Typology ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.responses[204] = {
          description: 'No content.'
    } */
    /* #swagger.responses[404] = {
          description: 'Facade Typology not found or deletion failed.'
    } */
    /* #swagger.responses[500] = {
          description: 'Failed to delete Facade Typology.'
    } */
    service.delete(req, res);
  }
);

export default router;
