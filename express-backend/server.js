const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();

const authRoute = require('./routes/auth.route');
const projectRoute = require('./routes/project.route');
const listRoute = require('./routes/list.route');
const issueRoute = require('./routes/issue.route');
const userRoute = require('./routes/user.route');
const memberRoute = require('./routes/member.route');
const commentRoute = require('./routes/comment.route');
const { restrictProjectMiddleware } = require('./utils/restrictProjectMiddleware');

const corOptions = {
  credentials: true,
  origin: true,
};

app.use(cors(corOptions));
app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/project', projectRoute);
app.use('/api/list', restrictProjectMiddleware, listRoute);
app.use('/api/issue', restrictProjectMiddleware, issueRoute);
app.use('/api/member', restrictProjectMiddleware, memberRoute);
app.use('/api/comment', restrictProjectMiddleware, commentRoute);

app.listen(process.env.PORT || 3008, () => {
  console.log("Server running correctly")
});
