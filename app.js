  const express = require('express');
  const morgan = require('morgan');
  const path = require('path');
  const cookieParser = require('cookie-parser');
  const bodyParser = require('body-parser');

  const AppError = require('./utils/appError');
  const globalErrorHandler = require('./controller/errorController');
  const clientRouter = require('./router/clientRouter');
  const projectRouter = require('./router/projectRouter');
  const taskRouter = require('./router/taskRouter');
  const employeeRouter = require('./router/employeeRouter');
  const viewRouter = require('./router/viewRouter');

  const app = express();
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(bodyParser.json());
  app.use(express.urlencoded({extended: true}))
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cookieParser());

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');


  // Middleware
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.headers);
    // console.log(req.cookies);
    next();
  });

  // app.post('/', (req, res) => {
  //   res.send(200, req.body);
  // });

  app.use('/', viewRouter);
  app.use('/api/task', taskRouter);
  app.use('/api/project', projectRouter);
  app.use('/api/employee', employeeRouter);
  app.use('/api/admin', clientRouter);
  app.use('/api/user', clientRouter);

  app.use(globalErrorHandler);

  module.exports = app;
