import express from 'express';
import routes from './http/routes.js';
import verifyUser from './http/middlewares/verifyUser.js';

const app = express();
app.use(express.json());
app.use(routes);

app.post('/verify', verifyUser, (request, response) => {
  return response.status(200).json({ success: 'ok' });
});
app.listen(3333, () => process.stdout.write('running on 3333\n'));
