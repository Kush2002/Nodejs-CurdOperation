import axios from 'axios';
import { showAlert } from './alert';

export const addProject = async (projectName, description, startDates, endDates, username, empName, notes) => {
    console.log('Created Data',projectName, description, startDates, endDates, username, empName, notes);
    try {
        const result = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:6001/api/project',
        data:{
            projectName, description, startDates, endDates, username, empName, notes
        }
    });
    console.log(result);
    if (result.data.status === 'success') {
        showAlert('success','Created Successfully');
        window.setTimeout(() => {
          location.assign('/project');
        }, 1000);
    }
    } catch (err) {
        showAlert('error',`${err.response.data.message}`);
    }
};

