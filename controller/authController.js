const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Client = require('./../model/clientModel');
const Employee = require('./../model/employeeModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = catchAsync(async (user, statusCode, res) => {
  const token = signToken(user._id);
  user.token = token;
  await user.save();
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.active = true;
  res.cookie('jwt', token, cookieOptions);
  // Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  // console.log(req.body);
  const newUser = await Client.create({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    role: req.body.role,
  });
  res.status(201).json({
    status: 'success',
    data: {
      newUser,
    },
  });
});

// ================================================= ADMIN LOGIN =================================================
exports.adminLogin = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  const role = 'admin';
  // Check if username and password are provided
  if (!username || !password) {
    return next(new AppError('Please provide username and password!', 400));
  }
  // Find the user by username and retrieve the password
  const user = await Client.findOne({ username }).select('+password');
  // Check if the user exists and if the password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect username or password', 401));
  }
  if (user.role !== role) {
    return next(new AppError(`Sorry, Only ${role} Can Access`, 403));
  }
  // If everything is correct, create and send the token
  createSendToken(user, 201, res);
});

// ================================================= EMPLOYEE LOGIN =================================================
exports.empLogin = catchAsync(async (req, res, next) => {
  // console.log(req.body);
  const { empEmail, password } = req.body;
  const role = 'employee';
  // Check if empId and password are provided
  if (!empEmail || !password) {
    return next(new AppError('Please provide empId and password!', 400));
  }
  // Find the Employee by empId and retrieve the password
  const user = await Employee.findOne({ empEmail }).select('+password');
  // console.log(user);
  // Check if the user exists and if the password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect username or password', 401));
  }
  if (user.role !== role) {
    return next(new AppError(`Sorry, Only ${role} Can Access`, 403));
  }
  // If everything is correct, create and send the token
  createSendToken(user, 201, res);
});

// ================================================= CLIENT LOGIN =================================================
exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  const role = 'user';
  // Check if username and password are provided
  if (!username || !password) {
    return next(new AppError('Please provide username and password!', 400));
  }
  // Find the user by username and retrieve the password
  const user = await Client.findOne({ username }).select('+password');
  // Check if the user exists and if the password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect username or password', 401));
  }
  if (user.role !== role) {
    return next(new AppError(`Sorry, Only ${role} Can Access`, 403));
  }
  // If everything is correct, create and send the token
  createSendToken(user, 201, res);
});

exports.logout = (req, res) => {
  res.cookie('JWT', 'loggedout', {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  // Getting Token And Check If It's There Save The Token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  // console.log(token);
  if (!token) {
    return next(
      new AppError('You Are Not Login! Please Login Get Access', 401)
    );
  }
  // console.log(token, process.env.JWT_SECRET);
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decode);
  // check if user still exists
  const currentUser = await Client.findById(decode.id);
  const currentEmployee = await Employee.findById(decode.id);

  if (!currentUser && !currentEmployee) {
    return next(new AppError('This user does not exist.', 401));
  }

  if (currentUser) {
    req.user = currentUser;
    res.locals.user = currentUser;
  } else if (currentEmployee) {
    res.emp = currentEmployee;
    res.locals.emp = currentEmployee;
  }
  next();
});

// Only for rendered pages, no errors!
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  // console.log('cookies', req.cookie);
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      // console.log(decoded);
      // 2) Check if user still exists
      const currentUser = await Client.findById(decoded.id);
      const currentEmployee = await Employee.findById(decoded.id);

      if (currentUser) {
        res.locals.user = currentUser;
      } else if (currentEmployee) {
        res.locals.emp = currentEmployee;
      }
      // console.log('current User', currentUser);
      // console.log('current Employee', currentEmployee);
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin'] role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You Do Not Have Permission To Perform This Action', 403)
      );
    }
    next();
  };
};
