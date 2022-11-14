import bcrypt from 'bcryptjs';
import { userJoiSchema } from '../models/User.js';
import User from '../models/User.js';
import { createError } from '../createError.js';
import jwt from 'jsonwebtoken';
export const registerNewUser = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  userJoiSchema
    .validateAsync({
      firstName,
      lastName,
      email,
      password,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: await bcrypt.hash(password, 10),
  });
  await newUser.save();
  res.json({
    message: 'Profile created successfully!',
    status: 200,
  });
};

export const loginUser = async (req, res, next) => {
  const findUser = await User.findOne({ email: req.body.email });
  
  if (!findUser) {
    next(createError(400));
  }
  const checkPassword = await bcrypt.compare(
    req.body.password,
    findUser.password
  );
  if (!checkPassword) {
    next(createError(400));
  }
  const token = jwt.sign({ id: findUser._id }, process.env.KEY);
  res.json({
    message: 'Success!',
    status: 200,
    result: 'OK',
    accessToken: token,
    userId: findUser._id,
    userImg: findUser.userImg,
    firstName: findUser.firstName,
    lastName: findUser.lastName,
    email: findUser.email,
    createdDate: findUser.created_date,
  });
};
