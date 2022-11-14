import User from '../models/User.js';
import Board, { boardJoiSchema } from '../models/Board.js';
import { createError } from '../createError.js';
import { saveNewBoard } from '../services/boardsService.js';
export const createUserBoard = async (req, res, next) => {
  boardJoiSchema.validateAsync(req.body);
  const board = new Board(req.body);
  await board.save();
  res.status(200).json({ message: 'Ok', status: 200 });
};

export const getUserBoards = async (req, res, next) => {
  const findUser = await User.findById(req.user.userId);
  if (!findUser) {
    next(createError(400));
  }
  const boards = await Board.find({ userId: req.user.userId });
  res.status(200).json(boards);
};

export const getUserBoardById = async (req, res, next) => {
  const findBoard = await Board.findById(req.params.id);
  if (!findBoard) {
    next(createError(400));
  }
  res.status(200).json(findBoard);
};

export const deleteUserBoard = async (req, res, next) => {
  const board = await Board.findById(req.params.id);
  if (!board) {
    next(createError(400));
  }
  board.deleteOne();
  res.json({
    message: 'Board deleted successfully',
    status: 200,
  });
};

export const updateBoard = async (req, res, next) => {
  const board = Board.findById(req.params.id);
  if (!board || Object.keys(req.body).length < 1) {
    next(createError(400));
  } else {
    await board.updateOne({
      boardName: req.body.boardName,
      boardDesc: req.body.boardDesc,
    });
    res.json({
      message: 'Board details changed successfully',
      status: 200,
    });
  }
};
