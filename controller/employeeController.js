const Employee = require('../model/employeeModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createEmployee = catchAsync(async (req, res, next) => {
    try {
        const newEmployee = new Employee({
            empId: req.body.empId,
            empName: req.body.empName,
            empEmail: req.body.empEmail,
            password: req.body.password,
            empPhone: req.body.empPhone,
            empAddress: req.body.empAddress
        });
        await newEmployee.save();
        res.status(201).json({
            status: 'success',
            data: {
                newEmployee,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
});

exports.getAllEmployee = catchAsync(async(req, res, next) => {
    const allEmployee = await Employee.find();
    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: allEmployee.length,
      data: {
        allEmployee,
      },
    });
  });
  
  exports.getEmployee = catchAsync(async(req, res, next) => {
    const getEmployee = await Employee.findById(req.params.id);
    if (!getEmployee) {
      return next(new AppError("No Project found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        getEmployee,
      },
    });
  });

  exports.updateEmployee = catchAsync(async(req, res, next) => {
    // console.log('Employee',req.body);
    const { id } = req.params;
    // console.log('id',id);
      const { empId, empName, empEmail, empPhone, empAddress } = req.body;
      const updateEmployee = await Employee.findOneAndUpdate(
        { _id: id },
        { empId, empName, empEmail, empPhone, empAddress },
        { new: true, runValidators: true }
      );
    // console.log(updateEmployee);
    if (!updateEmployee) {
      return next(new AppError("No Employee found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        updateEmployee,
      },
    });
  });
  
  exports.deleteEmployee = catchAsync(async(req, res, next) => {
    try{
      // console.log('Employee ID',req.params);
      const deleteEmployee = await Employee.findOneAndDelete({_id:req.params.id});
      // console.log('Delete Employee Data',deleteEmployee);
      if (!deleteEmployee) {
        return next(new AppError("No Employee found with that ID", 404));
      }
      res.status(202).json({
        status: 'success',
        // data: deleteEmployee,
      });
    }catch(err){
      console.log(err)
    }
  });