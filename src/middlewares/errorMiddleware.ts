import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/AppError';

// Middleware centralizado de manejo de errores
const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Si ya es un AppError, usamos sus valores
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Errores inesperados
  console.error('Unhandled error:', err);
  return res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
};

export default errorMiddleware;
