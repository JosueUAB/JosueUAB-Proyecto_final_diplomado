import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import AppError from '../utils/AppError';

const validateRequest = (req: Request, _res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Construimos un array estructurado de errores: { field, message }
    const details = errors.array().map((e: any) => ({ field: e.param || e.path || e.location || 'unknown', message: e.msg }));
    return next(new AppError('Errores de validación', 400, true, details));
  }
  return next();
};

export default validateRequest;
