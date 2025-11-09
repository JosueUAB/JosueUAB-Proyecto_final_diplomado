import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/AppError';

// Middleware centralizado de manejo de errores
const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Si ya es un AppError, usamos sus valores y devolvemos details si los tiene
  if (err instanceof AppError) {
    const payload: any = {
      status: 'error',
      message: err.message,
    };
    if (err.details) payload.details = err.details;
    return res.status(err.statusCode).json(payload);
  }

  // Errores inesperados
  console.error('Unhandled error:', err);
  return res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
};

export default errorMiddleware;
