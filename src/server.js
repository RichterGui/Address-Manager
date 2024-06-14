import express from 'express';
import routes from './http/routes.js'

const app = express();
app.use(express.json());
app.use(routes)
app.listen(3333, () => process.stdout.write('running on 3333\n'));
