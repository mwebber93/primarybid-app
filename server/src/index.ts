import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import { initialiseUrlRoutes } from './urlService/Routes';
import { initialiseDbConnection } from './database';

const PORT = 3001;
const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initialiseUrlRoutes(app);

// Start the REST service.
app.listen(PORT, () => console.log(`Running on ${PORT}`));

// Start the database.
initialiseDbConnection();


