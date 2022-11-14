import User from '../models/User.js';
import Task, { taskJoiSchema } from '../models/Task.js';
import Board from '../models/Board.js';
import { createError } from '../createError.js';
export const createTask = async (req, res, next) => {
  const obj = req.body;
  obj.userId = req.user.userId;
  taskJoiSchema.validateAsync(req.body);
  console.log(obj);
  const board = await Board.findById(req.body.boardId);
  if (!board) {
    next(createError(400));
  }
  if (req.body.status === 'todo') {
    await board.updateOne({
      tasks: {
        todo: board.tasks.todo + 1,
        progress: board.tasks.progress,
        done: board.tasks.done,
      },
    });
  } else if (req.body.status === 'progress') {
    await board.updateOne({
      tasks: {
        todo: board.tasks.todo,
        progress: board.tasks.progress + 1,
        done: board.tasks.done,
      },
    });
  } else if (req.body.status === 'done') {
    await board.updateOne({
      tasks: {
        todo: board.tasks.todo,
        progress: board.tasks.progress,
        done: board.tasks.done + 1,
      },
    });
  }
  const task = new Task(obj);
  await task.save();
  res.status(200).json({ message: 'Ok', status: 200 });
};

export const getUserTasks = async (req, res, next) => {
  const findUser = await User.findById(req.user.userId);
  if (!findUser) {
    next(createError(400));
  }
  const tasks = await Task.find({
    userId: req.user.userId,
    boardId: req.params.id,
  });
  res.status(200).json(tasks);
};

export const changeColor = async (req, res, next) => {
  const board = await Board.findById(req.body.boardId);
  if (!board) {
    next(createError(400));
  } else {
    if (req.body.status === 'todo') {
      await board.updateOne({
        todoColor: req.body.color,
      });
    } else if (req.body.status === 'progress') {
      await board.updateOne({
        progressColor: req.body.color,
      });
    } else if (req.body.status === 'done') {
      await board.updateOne({
        doneColor: req.body.color,
      });
    }
    res.json({
      message: 'Board details changed successfully',
      status: 200,
    });
  }
};

export const updateTask = async (req, res, next) => {
  console.log(req.body);
  const task = await Task.findById(req.body.taskId);
  if (!task) {
    next(createError(400));
  } else {
    await task.updateOne({
      taskName: req.body.taskName,
    });

    res.json({
      message: 'Task details changed successfully',
      status: 200,
    });
  }
};

export const updateTaskArchived = async (req, res, next) => {
  const task = await Task.findById(req.body.taskId);
  if (!task) {
    next(createError(400));
  } else {
    await task.updateOne({
      archived: req.body.archived,
    });
    res.json({
      message: 'Task details changed successfully',
      status: 200,
    });
  }
};

export const updateTaskStatus = async (req, res, next) => {
  console.log(req.body);
  const task = await Task.findById(req.body.taskId);
  if (!task) {
    next(createError(400));
  } else {
    await task.updateOne({
      status: req.body.status,
    });
    res.json({
      message: 'Task details changed successfully',
      status: 200,
    });
  }
};

export const deleteTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    next(createError(400));
  }
  const board = await Board.findById(task.boardId);
  if (!board) {
    next(createError(400));
  }
  if (task.status === 'todo') {
    await board.updateOne({
      tasks: {
        todo: board.tasks.todo - 1,
        progress: board.tasks.progress,
        done: board.tasks.done,
      },
    });
  } else if (task.status === 'progress') {
    await board.updateOne({
      tasks: {
        todo: board.tasks.todo,
        progress: board.tasks.progress - 1,
        done: board.tasks.done,
      },
    });
  } else if (task.status === 'done') {
    await board.updateOne({
      tasks: {
        todo: board.tasks.todo,
        progress: board.tasks.progress,
        done: board.tasks.done - 1,
      },
    });
  }
  task.deleteOne();
  res.json({
    message: 'Task deleted successfully',
    status: 200,
  });
};

