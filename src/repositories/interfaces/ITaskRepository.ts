import { ITask } from '../models/task';

export interface IReadTaskRepository {
  findAll(): Promise<ITask[]>;
  findById(id: string): Promise<ITask | null>;
}

export interface IWriteTaskRepository {
  create(data: Partial<ITask>): Promise<ITask>;
  update(id: string, data: Partial<ITask>): Promise<ITask | null>;
  updateStatus(id: string, status: string): Promise<ITask | null>;
}

export interface ITaskRepository extends IReadTaskRepository, IWriteTaskRepository {}