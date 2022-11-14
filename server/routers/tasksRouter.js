import express from 'express';
import { changeColor, createTask, getUserTasks, updateTask,updateTaskArchived,deleteTask, updateTaskStatus } from '../controllers/tasksController.js';
import asyncWrapper from '../asyncWrapper.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', authMiddleware, asyncWrapper(createTask));
router.get('/:id', authMiddleware, asyncWrapper(getUserTasks));
router.post('/color', authMiddleware, asyncWrapper(changeColor));

// router.delete('/:id', authMiddleware, asyncWrapper(deleteUserBoard));
router.put('/', authMiddleware, asyncWrapper(updateTask));
router.put('/archive', authMiddleware, asyncWrapper(updateTaskArchived));
router.put('/status', authMiddleware, asyncWrapper(updateTaskStatus));
router.delete('/:id', authMiddleware, asyncWrapper(deleteTask));

export default router;
