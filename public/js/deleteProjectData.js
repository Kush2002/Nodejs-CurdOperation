import axios from 'axios';
import { showAlert } from './alert';

export const deleteProjectData = async (id) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `http://127.0.0.1:6001/api/project/${id}`,
            data:{
                id:id
            }
        });
        console.log('result', res);
        if(res.data.status === 'success') {
            showAlert('success','Project Deleted Successfully');
            window.setTimeout(() => {
                location.reload();
            }, 1000);
        }
    } catch (err) {
        showAlert('error',`${err.response.data.message}`);
    }
};

