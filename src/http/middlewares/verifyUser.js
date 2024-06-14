import express from 'express';
import jwt from 'jsonwebtoken';
const { verify } = jwt;
import { config } from 'dotenv';
config();

export default async function verifyUser(request, response, next) {
  console.log(request.headers);
  const { id, authorization } = request.headers;

  const decode = verify(authorization, process.env.SECRET_KEY);

  if (decode && decode.hash === id) {
    next();
  } else {
    return response.status(401).send('Unauthorized');
  }
}
