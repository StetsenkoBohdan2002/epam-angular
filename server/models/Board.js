import mongoose from 'mongoose';
import Joi from 'joi';
const boardJoiSchema = Joi.object({
  userId: Joi.string().required(),
  boardName: Joi.string().required(),
  boardDesc: Joi.string().required(),
});
const Board = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  boardName: {
    type: String,
    required: true,
  },
  todoColor:{
    type: String,
    required: false,
    default:'#b4b4b4'
  },
  progressColor:{
    type: String,
    required: false,
    default:'#b4b4b4'
  },
  doneColor:{
    type: String,
    required: false,
    default:'#b4b4b4'
  },
  boardDesc: {
    type: String,
    required: true,
  },
  tasks: {
    todo: {
      type: Number,
      default: 0,
    },
    progress: {
      type: Number,
      default: 0,
    },
    done: {
      type: Number,
      default: 0,
    },
  },
  createdDate: {
    type: String,
    default: new Date().toISOString(),
  },
});
export { boardJoiSchema };
export default mongoose.model('Board', Board);
