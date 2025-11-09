import Task, { ITask } from '../models/task';
import AppError from '../utils/AppError';

export const createTaskService = async (data: Partial<ITask>): Promise<ITask> => {
  const task = new Task(data);
  await task.save();
  return task;
};

export const getTasksService = async (): Promise<ITask[]> => {
  return Task.find().sort({ createdAt: -1 });
};

export const getTaskByIdService = async (id: string): Promise<ITask> => {
  const task = await Task.findById(id);
  if (!task) {
    throw new AppError('Tarea no encontrada', 404);
  }
  return task;
};

export const updateTaskStatusService = async (id: string, status: string): Promise<ITask> => {
  const validStatuses = ['Pendiente', 'En progreso', 'Completada'];
  if (!validStatuses.includes(status)) {
    throw new AppError('Estado inválido', 400);
  }

  const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
  if (!task) {
    throw new AppError('Tarea no encontrada', 404);
  }
  return task;
};
