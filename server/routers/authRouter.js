import express from 'express';
import {
  registerNewUser,
  loginUser,
} from '../controllers/authController.js';
import asyncWrapper from '../asyncWrapper.js';
// import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', asyncWrapper(registerNewUser));
router.post('/login', asyncWrapper(loginUser));
// router.post('/forgot_password', authMiddleware, asyncWrapper(forgotPassword));

export default router;
