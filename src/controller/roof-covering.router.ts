import express, { Request, Response } from 'express';
import RoofCoveringService from '../service/roof-covering.service';

const router = express.Router();
const service = new RoofCoveringService();

router.get('/roof-coverings', async (req: Request, res: Response) => {
  // #swagger.tags = ['Roof Coverings']
  // #swagger.summary = 'Gets all Roof Coverings'
  // #swagger.description = 'Endpoint to get all existent Roof Coverings.'
  /* #swagger.responses[200] = {
        description: 'Successful operation.',
        schema: [{$ref: '#/components/schemas/RoofCovering'}]
    } */
  /* #swagger.responses[404] = {
        description: 'Roof Coverings not found.'
    } */
  /* #swagger.responses[500] = {
        description: 'Failed to retrieve Roof Coverings.'
  } */
  return service.getRoofCoverings(req, res);
});

router.get(
  '/roof-coverings/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Roof Coverings']
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
    return service.getRoofCoveringById(req, res);
  }
);

router.post(
  '/roof-coverings',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Roof Coverings']
    // #swagger.summary = 'Creates a new Roof Covering'
    // #swagger.description = 'Endpoint to create a new Roof Covering.'
    /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/RoofCovering" }
              }
          }
    } */
    /* #swagger.responses[201] = {
          description: 'Roof Covering created successfully.',
          schema: { $ref: '#/components/schemas/RoofCovering' }
    } */
    /* #swagger.responses[500] = {
          description:  'Failed to create Roof Covering'
    } */
    return service.create(req, res);
  }
);

router.put(
  '/roof-coverings/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Roof Coverings']
    // #swagger.summary = 'Updates an existent Roof Covering'
    // #swagger.description = 'Endpoint to update a Roof Covering.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Roof Covering ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/RoofCovering" }
              }
          }
    } */
    /* #swagger.responses[200] = {
          description: 'Roof Covering updated successfully.',
          schema: { $ref: '#/components/schemas/RoofCovering' }
    } */
    /* #swagger.responses[404] = {
          description:  'Roof Covering not found or update failed'
    } */
    /* #swagger.responses[500] = {
          description:  'Failed to update Roof Covering'
    } */
    service.update(req, res);
  }
);

router.delete(
  '/roof-coverings/:id',
  async (req: Request, res: Response) => {
    // #swagger.tags = ['Roof Coverings']
    // #swagger.summary = 'Deletes a Roof Covering'
    // #swagger.description = 'Deletes a Roof Covering by their ID.'
    /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'Roof Covering ID.',
        required: true,
        type: 'integer'
    } */
    /* #swagger.responses[204] = {
          description: 'No content.'
    } */
    /* #swagger.responses[404] = {
          description: 'Roof Covering cannot be deleted buildings associated: [xxxx, xxxx].'
    } */
    /* #swagger.responses[404] = {
          description: 'Roof Covering not found or deletion failed.'
    } */
    /* #swagger.responses[500] = {
          description: 'Failed to delete Roof Covering.'
    } */
    service.delete(req, res);
  }
);

export default router;
