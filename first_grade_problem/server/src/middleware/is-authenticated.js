const jwt = require('jsonwebtoken');
//here we check if the user is allow to receive a certain resourcess
module.exports = (req, res, next) => {
  const authHeaders = req.get('Authorization');
  if (!authHeaders) {
    return res.status(401)
      .json({ message: 'Not authenticated.' })
  }
  const token = req.get('Authorization').split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'somesupersecret')
  } catch(error) {
    return res.status(401)
      .json({ message: 'Token is invalid.', error });
  }

  if (!decodedToken) {
    return res.status(401)
      .json({ message: 'Not authenticated.' });
  }

  //with this we attach the userId to the request and all the time we can use req.userId and it is the current user id's
  req.userId = decodedToken.userId;
  next();
}