import { createError } from './createError.js';

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    try {
      return controller(req, res, next);
    } catch (err) {
      next(createError(500));
    }
  };
};

export default asyncWrapper;
