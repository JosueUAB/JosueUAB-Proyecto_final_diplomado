import Task, { ITask } from '../models/task';
import { ITaskRepository } from './interfaces/ITaskRepository';

export class MongooseTaskRepository implements ITaskRepository {
  async create(data: Partial<ITask>): Promise<ITask> {
    const task = new Task(data);
    await task.save();
    return task;
  }

  async findAll(): Promise<ITask[]> {
    // Order by position (asc) then createdAt desc
    return Task.find().sort({ position: 1, createdAt: -1 });
  }

  async findById(id: string): Promise<ITask | null> {
    return Task.findById(id);
  }

  async updateStatus(id: string, status: string): Promise<ITask | null> {
    return Task.findByIdAndUpdate(id, { status }, { new: true });
  }

  async update(id: string, data: Partial<ITask>): Promise<ITask | null> {
    return Task.findByIdAndUpdate(id, data, { new: true });
  }
}
