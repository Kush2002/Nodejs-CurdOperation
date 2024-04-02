import axios from 'axios';
import { showAlert } from "./alert";

export const empLogin = async (empEmail, password) => {
  // console.log(empEmail, password);
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:6001/api/employee/empLogin',
      data: {
        empEmail,
        password,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success','Login Successfully');
      window.setTimeout(() => {
        location.assign('/project');
      }, 1000);
    }
  } catch (err) {
    showAlert('error',`${err.response.data.message}`);
    window.setTimeout(() => {
      location.assign('/employeeLogin');
    }, 1000);
  }
};

export const empLogout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:6001/api/employee/logout'
    });
    if ((res.data.status === 'success')){
      showAlert('success','LogOut Successfully');
      window.setTimeout(() =>{
        location.assign('/employeeLogin');
      },1000);
    }
  } catch (err) {
    console.log(err.response);
    showAlert('error', `${err.response.data.message}`);
  }
};

export const add_employee = async (empId, empName, empEmail, password, empPhone, empAddress) => {
  // console.log('Employee Details:=',empId, empName, empEmail, password, empPhone, empAddress);
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:6001/api/employee/create',
      data: {
        empId, empName, empEmail, password, empPhone, empAddress
      },
    });
    // console.log(res);
    if (res.data.status === 'success') {
      showAlert('success','Employee Create Successfully');
      window.setTimeout(() => {
        location.assign('/employee');
      }, 1000);
    }
  } catch (err) {
    showAlert('error',`${err.response.data.message}`);
    window.setTimeout(() => {
      Location.assign('/');
    }, 1000);
  }
};

export const editEmployee = async (id,empId, empName, empEmail, empPhone, empAddress) => {
  // console.log('=:Edit Employee:=',id,empId, empName, empEmail, empPhone, empAddress);
      try {
          const result = await axios({
          method: 'PATCH',
          url: `http://127.0.0.1:6001/api/employee/updateEmployee/${id}`,
          data:{
            id,empId, empName, empEmail, empPhone, empAddress
          }
      });
      // console.log(result);
      if (result.data.status === 'success') {
          showAlert('success','Employee Updated Successfully');
          window.setTimeout(() => {
            location.assign('/employee');
          }, 1000);
      }
      } catch (err) {
          showAlert('error',`${err.response.data.message}`);
      }
  };

  export const deleteEmployee = async (id) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `http://127.0.0.1:6001/api/employee/deleteEmployee/${id}`,
            data:{
                id:id
            }
        });
        console.log('result', res);
        if(res.data.status === 'success') {
            showAlert('success','Employee Deleted Successfully');
            window.setTimeout(() => {
                location.reload();
            }, 1000);
        }
    } catch (err) {
        showAlert('error',`${err.response.data.message}`);
    }
};