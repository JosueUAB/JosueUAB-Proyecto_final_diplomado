import AppError from '../../utils/AppError';

export interface ITaskStatusValidator {
  validateStatus(status: string): void;
}

export class TaskStatusValidator implements ITaskStatusValidator {
  private readonly validStatuses = ['Pendiente', 'En progreso', 'Completada'] as const;
  
  validateStatus(status: string): void {
    if (!this.validStatuses.includes(status as any)) {
      throw new AppError('Estado inválido', 400);
    }
  }
  
  getValidStatuses(): readonly string[] {
    return this.validStatuses;
  }
}