import Board from '../models/Board.js';
export const saveNewBoard = async (req) => {
  const board = new Board(req.body);
  return await board.save();
};
