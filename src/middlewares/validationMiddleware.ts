import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import AppError from '../utils/AppError';

const validateRequest = (req: Request, _res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().map(e => `${e.param}: ${e.msg}`).join('; ');
    return next(new AppError(message, 400));
  }
  return next();
};

export default validateRequest;
