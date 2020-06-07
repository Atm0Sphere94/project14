const express = require('express');
const bodyParser = require('body-parser');
const cookies = require('cookie-parser');
const helmet = require('helmet');

const app = express();

const { PORT, connectDB } = require('./config');
const routeAll = require('./routes/routes');
const { createUser, login } = require('./controllers/users');

const errorHandler = require('./errors/errorHandler');
const auth = require('./middlewares/auth');


connectDB();
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookies());

app.post('/signup', createUser);
app.post('/signin', login);
app.use(auth);
app.use('/', routeAll);
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
