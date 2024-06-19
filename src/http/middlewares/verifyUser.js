import jwt from 'jsonwebtoken';
const { verify } = jwt;
import { config } from 'dotenv';
config();

export default async function verifyUser(request, response, next) {
  const { userid, accesstoken } = request.headers;
  if (!userid || !accesstoken) {
    return response.status(401).send('Id or token not provided');
  }

  const decode = verify(accesstoken, process.env.SECRET_KEY);

  if (decode.hash === userid) {
    next();
  } else {
    return response.status(401).send('Unauthorized');
  }
}
