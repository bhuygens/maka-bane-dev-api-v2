import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as firebase from 'firebase-admin';

@Injectable()
export class PreauthMiddleware implements NestMiddleware {
  constructor() {}

  private static accessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Access Denied',
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (token != null && token != '') {
      firebase
        .auth()
        .verifyIdToken(token.replace('Bearer ', ''))
        .then(async (decodedToken) => {
          req['user'] = {
            email: decodedToken.email,
          };
          next();
        })
        .catch((error) => {
          console.error(error);
          PreauthMiddleware.accessDenied(req.url, res);
        });
    } else {
      next();
    }
  }
}
