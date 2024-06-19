import { app } from './app.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
const root = process.cwd();
import process from 'node:process';
import { config } from 'dotenv';
config();

const id = process.pid;
const swaggerDocument = JSON.parse(
  fs.readFileSync(`${root}/addressmanager.openapi.json`, 'utf-8'),
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = app.listen(3333, () => console.log(`Port 3333, pid: ${id}`));

process.on('SIGTERM', () => {
  server.close(() => process.exit(1));
});
