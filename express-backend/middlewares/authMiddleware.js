const jwt = require('jsonwebtoken');
const cookieConfig = require('../controllers/util')

exports.authMiddleware = (req, res, next) => {
    try {
    const cookie = req.cookies['jira-clone'];
    if (!cookie)
      return res
        .status(401)
        .json({ status: 401, message: 'please log in to access this resource' })
      const token = JSON.parse(cookie).token;
      const payload = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
      req.user = payload;
      return next();
    } catch (err) {
      return res
        .clearCookie('jira-clone', cookieConfig)
        .status(401)
        .json({ message: err.message })
        .end();
    }
  };