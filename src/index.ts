import 'dotenv/config';
import express, { json, urlencoded } from 'express';

import buildingRouter from './controller/building.router';
import openingRouter from './controller/opening.router';
import architectonicAdequacyRouter from './controller/architectonic-adequacy.router';
import conservationLevelRouter from './controller/conservation-level.router';
import currentStateRouter from './controller/current-state.router';
import facadeTypologyRouter from './controller/facade-typology.router';
import interventionRouter from './controller/intervention.router';
import roofCoveringRouter from './controller/roof-covering.router';
import wallCoveringRouter from './controller/wall-covering.router';
import structuralSystemRouter from './controller/structural-system.router';
import useTypeRouter from './controller/use-type.router';

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./config/swagger/swagger-output.json');

const cors = require('cors');
const app = express();
const { API_PORT = 3000, SWAGGER_DOCS = '/api-docs' } = {
  ...process.env,
};

app.use(
  cors({
    exposedHeaders: [
      'Content-Length',
      'Content-Range',
      'X-Content-Range',
    ],
  })
);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(buildingRouter);
app.use(openingRouter);
app.use(architectonicAdequacyRouter);
app.use(conservationLevelRouter);
app.use(currentStateRouter);
app.use(facadeTypologyRouter);
app.use(interventionRouter);
app.use(roofCoveringRouter);
app.use(wallCoveringRouter);
app.use(structuralSystemRouter);
app.use(useTypeRouter);

/* Swagger Docs */
app.use(SWAGGER_DOCS, swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(API_PORT, async () => {
  console.log(
    `API documentation: http://0.0.0.0:${API_PORT}${SWAGGER_DOCS}`
  );
  console.log(`Server is running on port ${API_PORT}`);
});
