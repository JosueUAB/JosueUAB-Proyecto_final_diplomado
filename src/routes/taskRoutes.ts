import { Router } from 'express';
import { createTask, getTasks } from '../controllers/taskController';

const router = Router();

// POST /tasks -> crear tarea
router.post('/', createTask);

// GET /tasks -> obtener todas las tareas
router.get('/', getTasks);

export default router;
