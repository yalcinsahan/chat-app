import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Request interface to include the 'user' property
interface AuthenticatedRequest extends Request {
  user?: { username: string };
}


// Middleware to verify JWT token
export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token: string | undefined = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ error: 'Token is missing' });
  }

  jwt.verify(token.split(' ')[1], `${process.env.JWT_SECRET_KEY}`, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token is invalid' });
    }
    // Add 'user' property to the request
    req.user = decoded as { username: string };
    next();
  });
};
