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

// Obtener todas las tareas
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
};

// Actualizar el estado de una tarea
export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pendiente', 'En progreso', 'Completada'];
    if (!status || !validStatuses.includes(status)) {
      res.status(400).json({ message: 'Estado inválido' });
      return;
    }

    const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
    if (!task) {
      res.status(404).json({ message: 'Tarea no encontrada' });
      return;
    }

    res.json(task);
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
};
