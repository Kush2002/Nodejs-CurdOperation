import axios from 'axios';
import { showAlert } from './alert';

export const editProjectData = async (id,projectName, description, startDates, endDates, username, empName, notes) => {
// console.log('=:edit Project:=',id,projectName, description, startDates, endDates, username, empName, notes);
    try {
        const result = await axios({
        method: 'PATCH',
        url: `http://127.0.0.1:6001/api/project/${id}`,
        data:{
            id,projectName, description, startDates, endDates, username, empName, notes
        }
    });
    // console.log(result);
    if (result.data.status === 'success') {
        showAlert('success','Project Updated Successfully');
        window.setTimeout(() => {
          location.assign('/project');
        }, 1000);
    }
    } catch (err) {
        showAlert('error',`${err.response.data.message}`);
    }
};
