import { Router } from 'express';
import { createTask } from '../controllers/taskController';

const router = Router();

// POST /tasks -> crear tarea
router.post('/', createTask);

export default router;
