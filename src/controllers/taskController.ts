import { Request, Response, NextFunction } from 'express';
import { taskService } from '../services/taskService';
import AppError from '../utils/AppError';

// Crea una nueva tarea
export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return next(new AppError('El título es requerido', 400));
    }

  const task = await taskService.createTask({ title, description } as any);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};
// Obtener todas las tareas
export const getTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
  const tasks = await taskService.getTasks();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// Actualizar el estado de una tarea
export const updateTaskStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await taskService.updateTaskStatus(id, status);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updated = await taskService.updateTask(id, data as any);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
  const task = await taskService.getTaskById(id);
    res.json(task);
  } catch (error) {
    next(error);
  }
};
