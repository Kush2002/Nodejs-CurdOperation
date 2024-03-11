import axios from 'axios';
import { showAlert } from './alert';

export const deleteClientData = async (id) => {
    console.log(id);
    try {
        const result = await axios({
            method: 'DELETE',
            url: `http://127.0.0.1:6001/api/user/${id}`,
            data:id
        });
        console.log('result',result);
        if (result.data.status === 'success') {
            showAlert('success','Client Deleted Successfully');
            window.setTimeout(() => {
                location.reload();
            }, 2000);
        }
    } catch (err) {
        showAlert('error',`${err.response.data.message}`);
    }
};


