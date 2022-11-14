import mongoose from 'mongoose';
import Joi from 'joi';
const commentJoiSchema = Joi.object({
  taskId: Joi.string().required(),
  commentName: Joi.string().required(),
});
const Comment = new mongoose.Schema({
  taskId: {
    type: String,
    required: true,
  },
  commentName: {
    type: String,
    required: true,
  },
  createdDate: {
    type: String,
    default: new Date().toISOString(),
  },
});
export { commentJoiSchema };
export default mongoose.model('Comment', Comment);
