const Client = require("../model/clientModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createUser = catchAsync(async (req, res, next) => {
  // console.log(req.body);
    const newUser = await User.create(req.body);
    // console.log(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newUser,
      },
    });
});

exports.getUser = catchAsync(async (req, res, next) => {
  // console.log('get all user',req.body);
  const user = await Client.find();
  if(!user){
    return next(new AppError("No User found with that ID", 404));
  }
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: user.length,
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async(req, res, next) => {
  const { id } = req.params;
  // console.log('id',id);

  const { name, username, password, email, phone,address } = req.body;
  // console.log(name, username, password, email, phone,address);
  const useredit = await Client.findOneAndUpdate(
    { _id: id },
    { name, username, password, email, phone,address },
    { new: true, runValidators: true }
  );
  // console.log(useredit);
  if (!useredit) {
    return next(new AppError("No User found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      useredit,
    },
  });
});

exports.deleteUser = catchAsync(async(req, res, next) => {
  // console.log(req.params);
  const userdelete = await Client.findOneAndDelete({_id:req.params.id});
  // console.log(userdelete);
  if(!userdelete){
      return next(new AppError("There is no user with that id", 404))
    }
    res.status(200).json({
      status:'success',
      data:userdelete
    });
});