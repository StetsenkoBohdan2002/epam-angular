import express from 'express';
import { createCommentForTask,getTaskComments } from '../controllers/commentsController.js';
import asyncWrapper from '../asyncWrapper.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', authMiddleware, asyncWrapper(createCommentForTask));
router.get('/:id', authMiddleware, asyncWrapper(getTaskComments));


export default router;
