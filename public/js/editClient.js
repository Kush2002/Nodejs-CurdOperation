import axios from 'axios';
import { showAlert } from './alert';

export const editClient = async (id, name, username, password, email, phone, address) => {
    // console.log('=:edit user:=',id,name,username, password,email,phone,address);
    try {
        const result = await axios({
            method: 'PATCH',
            url: `http://127.0.0.1:6001/api/user/${id}`,
            data: {
                id, name, username, password, email, phone, address
            }
        });
        console.log(result);
        if (result.data.status === 'success') {
            showAlert('success', 'Updated Successfully');
            window.setTimeout(() => {
                location.assign('/client');
            }, 1000);
        }
    } catch (err) {
        showAlert('error',`${err.response.data.message}`);
    }
};
