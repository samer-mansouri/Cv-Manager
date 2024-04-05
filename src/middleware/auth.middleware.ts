import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('AuthMiddleware');
    const token = req.headers['auth-user'];

    if (Array.isArray(token)) {
      return res.status(400).json({ message: 'Invalid token format.' });
    }

    if (!token) {
      return res.status(403).json({ message: 'Access denied, token missing.' });
    }

    try {
      const secret =
        'oScfEDmtkFqWWZL+/+rJYPCXXhXLAgx7goTxyJ993GJ5Ht8MmdVKwoo/kAF/GOH7gOAT6ZEaNHf6DxHHbk1BQ9V67enMowzRQYhhMQep79xphEa2V+C7Rq117bKHyGiqEyioKQ9trKTfBtPFNesW0W9goR6uIxDdd6gTNsDKrOkfNwJ+fK/2EBUxcRa5hNnB+Wen16KS81sMOo9TdzL3pJUx7DSRugFBg7LWVYhKg3xIA4yQ3h1lW4jS8d6tUcdyi/l1TWBh4RsyC2vBjTJ6HZLVOoBBI3D7zEtj4/rzW5geAavXjeh58Hl6G0JxDyQ6XEECl/i9BpLcSn/zuIre1g==';
      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
      if (!('userId' in decoded) || !decoded.userId) {
        console.log('Token not containing userID');
        return res
          .status(401)
          .json({ message: 'Token does not contain userId.' });
      }
      req['user'] = decoded;
      console.log(decoded);
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  }
}
