import pkg from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export default async function verifyJwtValidity(request, response, next) {
  try {
    const { token } = request.params;
    const secret = process.env.SECRET_SHARED;
    let valid = pkg.verify(token, secret);
    request.body.addressid = valid.id;
    next();
  } catch (error) {
    if (error.message == 'jwt expired') {
      return response.status(498).json({ error: 'Token expired or invalid' });
    }
    return response.status(500).json({ error: 'Internal server error' });
  }
}
