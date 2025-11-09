import { ITask } from '../models/task';
import AppError from '../utils/AppError';
import { ITaskRepository, MongooseTaskRepository } from '../repositories/taskRepository';

export class TaskService {
  private repo: ITaskRepository;

  constructor(repo?: ITaskRepository) {
    this.repo = repo ?? new MongooseTaskRepository();
  }

  async createTask(data: Partial<ITask>): Promise<ITask> {
    return this.repo.create(data);
  }

  async getTasks(): Promise<ITask[]> {
    return this.repo.findAll();
  }

  async getTaskById(id: string): Promise<ITask> {
    const task = await this.repo.findById(id);
    if (!task) throw new AppError('Tarea no encontrada', 404);
    return task;
  }

  async updateTaskStatus(id: string, status: string): Promise<ITask> {
    const validStatuses = ['Pendiente', 'En progreso', 'Completada'];
    if (!validStatuses.includes(status)) {
      throw new AppError('Estado inválido', 400);
    }

    const task = await this.repo.updateStatus(id, status);
    if (!task) throw new AppError('Tarea no encontrada', 404);
    return task;
  }

  async updateTask(id: string, data: Partial<ITask>): Promise<ITask> {
    // If status provided, validate
    if (data.status) {
      const validStatuses = ['Pendiente', 'En progreso', 'Completada'];
      if (!validStatuses.includes(data.status)) {
        throw new AppError('Estado inválido', 400);
      }
    }

    const updated = await this.repo.update(id, data);
    if (!updated) throw new AppError('Tarea no encontrada', 404);
    return updated;
  }
}

// Exportar una instancia por defecto usando MongooseTaskRepository
export const taskService = new TaskService();
