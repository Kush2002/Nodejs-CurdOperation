import axios from 'axios';
import { showAlert } from './alert';

export const addTask = async (
  projectId,
  taskName,
  employeeName,
  description,
  endDates,
  currentDate
) => {
  // console.log(
  //   projectId,
  //   taskName,
  //   employeeName,
  //   description,
  //   endDates,
  //   currentDate
  // );
  try {
    const result = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:6001/api/task/addTask',
      data: {
        projectId,
        taskName,
        employeeName,
        description,
        endDates,
        currentDate,
      },
    });
    // console.log(result);
    if (result.data.status === 'success') {
      showAlert('success', 'Created Successfully');
      window.setTimeout(() => {
        location.assign('/project');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', `${err.response.data.message}`);
  }
};

export const addClient = async (
  name,
  username,
  password,
  email,
  phone,
  address
) => {
  // console.log('Created Data',name,username, password,email,phone,address);
  try {
    const result = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:6001/api/user/signup',
      data: {
        name,
        username,
        password,
        email,
        phone,
        address,
      },
    });
    // console.log(result);
    if (result.data.status === 'success') {
      showAlert('success', 'Created Successfully');
      window.setTimeout(() => {
        location.assign('/client');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', `${err.response.data.message}`);
  }
};
