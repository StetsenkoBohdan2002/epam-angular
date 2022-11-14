import User from '../models/User.js';
import Task, { taskJoiSchema } from '../models/Task.js';
import Board from '../models/Board.js';
import { createError } from '../createError.js';
import Comment, { commentJoiSchema } from '../models/Comment.js';

export const createCommentForTask = async (req, res, next) => {
  console.log(req.body)
  const task = await Task.findById(req.body.taskId);
  if (!task) {
    next(createError(400));
  }
  await task.updateOne({
    commentsCount: task.commentsCount + 1,
  });
  commentJoiSchema.validateAsync(req.body);
  const comment = new Comment(req.body);
  await comment.save();
  res.status(200).json({ message: 'Ok', status: 200 });
};

export const getTaskComments = async (req, res, next) => {
  const comments = await Comment.find({
    taskId: req.params.id,
  });
  res.status(200).json(comments);
};
