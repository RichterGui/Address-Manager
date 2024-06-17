import jwt from 'jsonwebtoken';
const { verify } = jwt;
import { config } from 'dotenv';
config();

export default async function verifyUser(request, response, next) {
  const { userid, authorization } = request.headers;

  const decode = verify(authorization, process.env.SECRET_KEY);

  if (decode.hash === userid) {
    next();
  } else {
    return response.status(401).send('Unauthorized');
  }
}
