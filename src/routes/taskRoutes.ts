import { Router } from 'express';
import { createTask, getTasks, updateTaskStatus } from '../controllers/taskController';

const router = Router();

// POST /tasks -> crear tarea
router.post('/', createTask);

// GET /tasks -> obtener todas las tareas
router.get('/', getTasks);

// PUT /tasks/:id -> actualizar estado
router.put('/:id', updateTaskStatus);

export default router;
