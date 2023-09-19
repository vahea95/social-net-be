import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import * as admin from 'firebase-admin';
import { InternalServerErrorException } from '../exceptions/internal-server';
import { NotFoundException } from '../exceptions/not-found.exception';

export class verifyToken implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction): Promise<string> {
    try {
      const authToken = req.headers['Authorization'];
      const decodedToken = await admin.auth().verifyIdToken(authToken);

      const verifiedToken = decodedToken.uid;

      if (!authToken) {
        throw new NotFoundException('token');
      }
      return verifiedToken;

      next();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
