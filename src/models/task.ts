import mongoose, { Document, Schema } from 'mongoose';

export interface ILabel {
  name: string;
  color?: string; // hex or color name
}

export interface ITask extends Document {
  title: string;
  description?: string;
  status: 'Pendiente' | 'En progreso' | 'Completada' | string;
  labels?: ILabel[];
  position?: number;
  createdAt: Date;
}

const LabelSchema = new Schema<ILabel>(
  {
    name: { type: String, required: true },
    color: { type: String },
  },
  { _id: false }
);

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Pendiente', 'En progreso', 'Completada'],
      default: 'Pendiente',
    },
    labels: { type: [LabelSchema], default: [] },
    position: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export default mongoose.model<ITask>('Task', TaskSchema);
