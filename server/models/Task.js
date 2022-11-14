import mongoose from 'mongoose';
import Joi from 'joi';
const taskJoiSchema = Joi.object({
  boardId: Joi.string().required(),
  userId: Joi.string().required(),
  taskName: Joi.string().required(),
  status: Joi.string(),
});
const Task = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  boardId: {
    type: String,
    required: true,
  },
  taskName: {
    type: String,
    required: true,
  },
  archived: {
    type: Boolean,
    default: false,
  },
  commentsCount: {
    type: Number,
    default: 0,
  },
  status: {
    type: 'String',
    enum: ['todo', 'progress', 'done'],
    default: 'todo',
  },
  createdDate: {
    type: String,
    default: new Date().toISOString(),
  },
});
export { taskJoiSchema };
export default mongoose.model('Task', Task);
