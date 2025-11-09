import { Request, Response } from 'express';
import Task from '../models/task';

// Crea una nueva tarea
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    if (!title) {
      res.status(400).json({ message: 'El título es requerido' });
      return;
    }

    const task = new Task({ title, description });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error al crear tarea:', error);
    res.status(500).json({ message: 'Error al crear la tarea' });
  }
};
