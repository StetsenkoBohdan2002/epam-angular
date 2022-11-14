import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(401)
      .json({ message: 'Please, provide authorization header' });
  }
  const token = authorization.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Please, include token to request' });
  }
  try {
    const tokenPayload = jwt.verify(token, process.env.KEY);
    req.user = {
      userId: tokenPayload.id,
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

export default authMiddleware;
