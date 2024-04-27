import express from 'express';
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

const cors = require('cors'); 
const app = express();
const port = 3000;

app.use(cors({ exposedHeaders: ['Content-Length', 'Content-Range', 'X-Content-Range'], }));
app.use(express.json());
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

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
