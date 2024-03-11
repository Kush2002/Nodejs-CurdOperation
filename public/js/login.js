import axios from 'axios';
import { showAlert } from "./alert";

export const login = async (username, password) => {
  // console.log(username, password);
  // alert(username, password);
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:6001/api/user/login',
      data: {
        username,
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
      Location.assign('/');
    }, 1000);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:6001/api/user/logout'
    });
    if ((res.data.status === 'success')){
      showAlert('success','LogOut Successfully');
      window.setTimeout(() =>{
        location.assign('/');
      },1000);
    }
  } catch (err) {
    console.log(err.response);
    showAlert('error', `${err.response.data.message}`);
  }
};
