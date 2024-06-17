import express from 'express';
import routes from './http/routes.js';

const app = express();
app.use(express.json());
app.use(routes);

export { app };
