import axios from 'axios';
import { showAlert } from './alert';

export const showTask = async (projectId) => {
  //   console.log('api ProjectId', projectId);
  try {
    const result = await axios({
      method: 'POST',
      url: `http://127.0.0.1:6001/api/task/getTask`,
      data: {
        projectId,
      },
    });
    console.log(result);
    if (result.data.status === 'success') {
      let html = '';
      let data = result.data.data.getTask;
      for (let i = 0; i < data.length; i++) {
        if (i == 0) {
          html += `<tr class="taskdata_header">
                  <th>Task Name</th>
                  <th>Description</th>
                  <th>Employee Name</th>
                  <th>End Date</th>
                  <th>Current Date</th></tr>`;
        }
        const formattedEndDate = new Date(
          data[i].endDates
        ).toLocaleDateString();
        html += `
              <tr class="taskdata_body">
              <td>${data[i].taskName}</td>
              <td>${data[i].description}</td>
              <td>${data[i].employeeName}</td>
              <td>${formattedEndDate}</td>
              <td>${data[i].createdAt}</td>
              </tr>
              `;
      }
      console.log(html);
      let rowid = $('.rowid').attr('data-rowid');
      console.log(rowid, 'rowid');
      console.log($('#' + rowid));
      $('#' + rowid).after(html);
    }
  } catch (err) {
    showAlert('error', `${err.response.data.message}`);
  }
};
