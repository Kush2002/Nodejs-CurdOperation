import axios from 'axios';
import { showAlert } from './alert';

export const showTask = async (projectId,empName) => {
    // console.log('api', projectId,empName);
  try {
    const result = await axios({
      method: 'POST',
      url: `http://127.0.0.1:6001/api/task/getTask`,
      data: {
        projectId,empName
      },
    });
    console.log(result);
    if (result.data.status === 'success') {
      let html = '';
      let data = result.data.data.getTask;
      let emp = result.data.data.getTask.employeeName
      for (let i = 0; i < data.length; i++) {
        if (i == 0) {
          html += `<tr class="taskdata_header">
                  <th>Task Name</th>
                  <th>Employee Name</th>
                  <th>Description</th>
                  <th>End Date</th>
                  <th>Current Date & Time</th></tr>`;
        }
        const formattedEndDate = new Date(
          data[i].endDates
        ).toLocaleDateString();
        html += `
              <tr class="taskdata_body">
              <td>${data[i].taskName}</td>
              <td>${data[i].employeeName}</td>
              <td>${data[i].description}</td>
              <td>${formattedEndDate}</td>
              <td>${new Date(data[i].createdAt).toLocaleString()}</td>
              </tr>
              `;
      }
      let rowid = $('.rowid').attr('data-rowid');
      $('#' + rowid).after(html);
      // console.log(html);
      // console.log(rowid, 'rowid');
      // console.log($('#' + rowid));
    }
  } catch (err) {
    showAlert('error', `${err.response.data.message}`);
  }
};
