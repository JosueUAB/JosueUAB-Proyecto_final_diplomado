import { ITask } from '../models/task';
import AppError from '../utils/AppError';
import { ITaskRepository, MongooseTaskRepository } from '../repositories/taskRepository';
import { ITaskStatusValidator, TaskStatusValidator } from './validators/TaskStatusValidator';

export class TaskService {
  private readonly statusValidator: ITaskStatusValidator;

  constructor(
    private readonly repo: ITaskRepository,
    statusValidator?: ITaskStatusValidator
  ) {
    this.statusValidator = statusValidator ?? new TaskStatusValidator();
  }

  async createTask(data: Partial<ITask>): Promise<ITask> {
    if (data.status) {
      this.statusValidator.validateStatus(data.status);
    }
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
    this.statusValidator.validateStatus(status);
    
    const task = await this.repo.updateStatus(id, status);
    if (!task) throw new AppError('Tarea no encontrada', 404);
    return task;
  }

  async updateTask(id: string, data: Partial<ITask>): Promise<ITask> {
    if (data.status) {
      this.statusValidator.validateStatus(data.status);
    }

    const updated = await this.repo.update(id, data);
    if (!updated) throw new AppError('Tarea no encontrada', 404);
    return updated;
  }
}

// Exportar una instancia por defecto usando MongooseTaskRepository
export const taskService = new TaskService(new MongooseTaskRepository());
