const jwt = require('jsonwebtoken');

exports.mandatory = (req, resp, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, 'JWT_SECRET');
    req.user = decode;

    next();
  } catch (error) {
    return resp.status(401).send({ message: 'Authentication Failed' });
  }
};

exports.optional = (req, resp, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decode = jwt.verify(token, 'JWT_SECRET');
      req.user = decode;
    }
    console.log('user optional', req.user);
    next();
  } catch (error) {
    console.log('errorass', error);
    next();
  }
};
