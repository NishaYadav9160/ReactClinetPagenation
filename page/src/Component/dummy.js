import React from "react";

function dummy() {
  return (
    <div>
      <table>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Status</th>
          <th>DueDate</th>
          <th>Add</th>
          <th>Update</th>
          <th>Remove</th>
        </tr>
        <tr>
          <td id="collapseButton" onclick="collapse(this)">
            +
          </td>
          <td>html</td>
          <td>pending</td>
          <td>7/2/2011</td>
          <td>html</td>
          <td>pending</td>
          <td>7/2/2011</td>
        </tr>
        <tr id="hidden">
          <td></td>
          <td colspan="3">
            <table>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Status</th>
                <th>DueDate</th>
                <th>Add</th>
                <th>Update</th>
                <th>Remove</th>
              </tr>
              <tr>
                <td id="collapseButton" onclick="collapse(this)">
                  +
                </td>
                <td>html</td>
                <td>pending</td>
                <td>7/2/2011</td>
                <td>html</td>
                <td>pending</td>
                <td>7/2/2011</td>
              </tr>
              <tr id="hidden">
                <td></td>
                <td colspan="2">
                  <table>
                    <tr>
                      <th>Title</th>
                      <th>Status</th>
                      <th>DueDate</th>
                      <th>Add</th>
                      <th>Update</th>
                      <th>Remove</th>
                    </tr>
                    <tr>
                      <td>html</td>
                      <td>pending</td>
                      <td>7/2/2011</td>
                      <td>html</td>
                      <td>pending</td>
                      <td>7/2/2011</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default dummy;
