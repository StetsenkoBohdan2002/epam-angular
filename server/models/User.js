import mongoose from 'mongoose';
import Joi from 'joi';
const userJoiSchema = Joi.object({
  firstName: Joi.string().regex(/[A-Z][a-z]+/),
  lastName: Joi.string().regex(/[A-Z][a-z]+/),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'uk'] },
    })
    .required(),
  password: Joi.string().min(3).required(),
});
const User = new mongoose.Schema({
  userImg: {
    type: String,
    default: 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png',
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_date: {
    type: String,
    default: new Date().toLocaleDateString('en-US'),
  },
});
export { userJoiSchema };

export default mongoose.model('User', User);
