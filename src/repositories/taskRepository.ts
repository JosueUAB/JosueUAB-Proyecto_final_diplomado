import Task, { ITask } from '../models/task';

export interface ITaskRepository {
  create(data: Partial<ITask>): Promise<ITask>;
  findAll(): Promise<ITask[]>;
  findById(id: string): Promise<ITask | null>;
  updateStatus(id: string, status: string): Promise<ITask | null>;
}

export class MongooseTaskRepository implements ITaskRepository {
  async create(data: Partial<ITask>): Promise<ITask> {
    const task = new Task(data);
    await task.save();
    return task;
  }

  async findAll(): Promise<ITask[]> {
    return Task.find().sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<ITask | null> {
    return Task.findById(id);
  }

  async updateStatus(id: string, status: string): Promise<ITask | null> {
    return Task.findByIdAndUpdate(id, { status }, { new: true });
  }
}
