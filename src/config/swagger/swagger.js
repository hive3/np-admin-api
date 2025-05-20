const swaggerAutogen = require('swagger-autogen')({
  openapi: '3.0.0',
});

const doc = {
  info: {
    title: 'NP-ADMIN-API',
    description: 'NP Admin API to handle Building related operations',
    version: '1.0.0',
  },
  host: '0.0.0.0:3000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  components: {
    // You can define reusable components here
    '@schemas': {
      // Define your data models here
      Intervention: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          description: {
            type: 'string',
            example: 'Openings in non-traditional materials',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-20T16:10:46.610Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-20T16:10:46.610Z',
          },
        },
      },
      Opening: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 2 },
          description: {
            type: 'string',
            example: 'Modern Materials',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-20T16:10:46.610Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-20T16:10:46.610Z',
          },
        },
      },
      RoofCovering: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          description: {
            type: 'string',
            example: 'Ceramic',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-20T16:10:46.610Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-20T16:10:46.610Z',
          },
        },
      },
      UseType: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 2 },
          description: {
            type: 'string',
            example: 'Residential',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-20T16:10:46.610Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-20T16:10:46.610Z',
          },
        },
      },
      CurrentState: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 3 },
          description: {
            type: 'string',
            example: 'In Use',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-20T16:10:46.610Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-20T16:10:46.610Z',
          },
        },
      },
      ConservationLevel: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          description: {
            type: 'string',
            example: 'Excellent (100-75%)',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-20T16:10:46.610Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-20T16:10:46.610Z',
          },
        },
      },
      ArchitectonicAdequacy: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 5 },
          description: {
            type: 'string',
            example: 'Vernacular with Dissonances',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-20T16:10:46.610Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-20T16:10:46.610Z',
          },
        },
      },
      FacadeTypology: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 7 },
          description: {
            type: 'string',
            example: 'n. Not identified',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-20T16:10:46.610Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-20T16:10:46.610Z',
          },
        },
      },
      StructuralSystem: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 2 },
          description: {
            type: 'string',
            example: 'Modern and Traditional',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-20T16:10:46.610Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-20T16:10:46.610Z',
          },
        },
      },
      WallCovering: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 2 },
          description: {
            type: 'string',
            example: 'Granite',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-20T16:10:46.610Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-20T16:10:46.610Z',
          },
        },
      },
      Building: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 123 },
          fid: { type: 'integer', example: 1850 },
          buildingId: { type: 'string', example: 'PN_Z01_001' },
          floors: { type: 'integer', example: 1 },
          OpeningId: { type: 'integer', example: 1 },
          StructuralSystemId: { type: 'integer', example: 1 },
          WallCoveringId: { type: 'integer', example: 1 },
          RoofCoveringId: { type: 'integer', example: 1 },
          UseTypeId: { type: 'integer', example: 1 },
          CurrentStateId: { type: 'integer', example: 1 },
          ConservationLevelId: { type: 'integer', example: 1 },
          ArchitectonicAdequacyId: { type: 'integer', example: 1 },
          FacadeTypologyId: { type: 'integer', example: 1 },
          Opening: {
            $href: '#/components/@schemas/Opening',
          },
          StructuralSystem: {
            $href: '#/components/@schemas/StructuralSystem',
          },
          WallCovering: {
            $href: '#/components/@schemas/WallCovering',
          },
          RoofCovering: {
            $href: '#/components/@schemas/RoofCovering',
          },
          UseType: {
            $href: '#/components/@schemas/UseType',
          },
          CurrentState: {
            $href: '#/components/@schemas/CurrentState',
          },
          ConservationLevel: {
            $href: '#/components/@schemas/ConservationLevel',
          },
          ArchitectonicAdequacy: {
            $href: '#/components/@schemas/ArchitectonicAdequacy',
          },
          FacadeTypology: {
            $href: '#/components/@schemas/FacadeTypology',
          },
          Interventions: {
            type: 'array',
            items: {
              $href: '#/components/@schemas/Intervention',
            },
          },
        },
      },
      BuildingDTO: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 123 },
          fid: { type: 'integer', example: 1850 },
          $buildingId: { type: 'string', example: 'PN_Z01_001' },
          floors: { type: 'integer', example: 1 },
          $OpeningId: { type: 'integer', example: 1 },
          $StructuralSystemId: { type: 'integer', example: 1 },
          $WallCoveringId: { type: 'integer', example: 1 },
          $RoofCoveringId: { type: 'integer', example: 1 },
          $UseTypeId: { type: 'integer', example: 1 },
          $CurrentStateId: { type: 'integer', example: 1 },
          $ConservationLevelId: { type: 'integer', example: 1 },
          $ArchitectonicAdequacyId: { type: 'integer', example: 1 },
          FacadeTypologyId: { type: 'integer', example: 1 },
          interventions: {
            type: 'array',
            items: {
              type: 'integer',
            },
            example: [1, 4, 6],
          },
        },
      },
      UnrealBuilding: {
        type: 'object',
        properties: {
          fid: { type: 'integer', example: 1850 },
          buildingId: { type: 'string', example: 'PN_Z01_001' },
          floors: { type: 'integer', example: 1 },
          opening: { type: 'string', example: 'Modern Materials' },
          structuralSystem: {
            type: 'string',
            example: 'Modern and Traditional',
          },
          wallCovering: { type: 'string', example: 'Granite' },
          roofCovering: { type: 'string', example: 'Ceramic' },
          useType: { type: 'string', example: 'Residential' },
          currentState: { type: 'string', example: 'In Use' },
          conservationLevel: {
            type: 'string',
            example: 'Excellent (100-75%)',
          },
          architectonicAdequacy: {
            type: 'string',
            example: 'Vernacular with Dissonances',
          },
          facadeTypology: {
            type: 'string',
            example: 'n. Not identified',
          },
          interventions: {
            type: 'array',
            items: {
              type: 'string',
            },
            example: [
              'Openings in non-traditional materials',
              'Non-traditional roof tiles',
              'Joint filling with Portland cement-based mortar',
              'Concrete elements added',
              'Volumes reconstructed or plasters added',
            ],
          },
        },
      },
    },
    // securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer' } }
  },
  // security: [{ bearerAuth: [] }] // Apply security globally
};

const outputFile = './swagger-output.json';
// Your Express route files
const endpointsFiles = ['../../controller/*.router.ts']; // Adjust paths as needed

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
  // If you want to start your app after generation, you can do it here:
  // require('./src/app'); // Your main app file
});
