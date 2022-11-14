import express from 'express';
import {
  createUserBoard,
  deleteUserBoard,
  getUserBoards,
  updateBoard,
  getUserBoardById,
} from '../controllers/boardsController.js';
import asyncWrapper from '../asyncWrapper.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', authMiddleware, asyncWrapper(createUserBoard));
router.get('/', authMiddleware, asyncWrapper(getUserBoards));
router.delete('/:id', authMiddleware, asyncWrapper(deleteUserBoard));
router.put('/:id', authMiddleware, asyncWrapper(updateBoard));
router.get('/:id', authMiddleware, asyncWrapper(getUserBoardById));

export default router;
