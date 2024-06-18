import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { config } from 'dotenv';
config();

export default async function generateSharedToken(addressId) {
  const secret = process.env.SECRET_SHARED;
  const payload = { id: addressId };
  const token = sign(payload, secret, { expiresIn: '30m' });
  return token;
}
