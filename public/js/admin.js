import axios from 'axios';
import { showAlert } from "./alert";

export const admin = async (username, password) => {
  // console.log(username, password);
  // alert(username, password);
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:6001/api/admin/adminLogin',
      data: {
        username,
        password,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success','Login Successfully');
      window.setTimeout(() => {
        location.assign('/home');
      }, 1000);
    }
  } catch (err) {
    showAlert('error',`${err.response.data.message}`);
    window.setTimeout(() => {
      location.assign('/admin');
    }, 1000);
  }
};

export const adminlogout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:6001/api/user/logout'
    });
    if ((res.data.status === 'success')){
      showAlert('success','LogOut Successfully');
      window.setTimeout(() =>{
        location.assign('/admin');
      },1000);
    }
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Error logging out! Try again.');
  }
};
