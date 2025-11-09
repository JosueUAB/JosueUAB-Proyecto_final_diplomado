import { Router } from 'express';
import { body, param } from 'express-validator';
import { createTask, getTasks, updateTaskStatus, getTaskById, updateTask } from '../controllers/taskController';
import validateRequest from '../middlewares/validationMiddleware';

const router = Router();

// POST /tasks -> crear tarea
router.post(
	'/',
	[body('title').notEmpty().withMessage('El título es requerido'), body('description').optional().isString()],
	validateRequest,
	createTask
);

// GET /tasks -> obtener todas las tareas
router.get('/', getTasks);

// GET /tasks/:id -> obtener por id
router.get('/:id', [param('id').isMongoId().withMessage('ID inválido')], validateRequest, getTaskById);

// PUT /tasks/:id -> actualizar estado
// PUT /tasks/:id -> actualizar (titulo, descripcion, status, labels, position)
router.put(
	'/:id',
	[param('id').isMongoId().withMessage('ID inválido')],
	validateRequest,
	updateTask
);

export default router;
