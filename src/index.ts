import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database';
import taskRoutes from './routes/taskRoutes';
import errorMiddleware from './middlewares/errorMiddleware';

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());
  // CORS para desarrollo (ajusta origen en producción si es necesario)
  app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'API de gestión de tareas - en construcción' });
});

const start = async () => {
  await connectDB();
  app.use('/tasks', taskRoutes);

  // Middleware de manejo de errores (debe ir después de las rutas)
  app.use(errorMiddleware);

  app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
  });
};

start();

