import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import taskRoutes from './routes/taskRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API de gestión de tareas - en construcción' });
});

const start = async () => {
  await connectDB();
  app.use('/tasks', taskRoutes);

  app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
  });
};

start();
