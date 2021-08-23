import React, { useState, useEffect } from "react";
import axios from "axios";
import Pageimplement from "./Pageimplement";
import "../Formbuild.css";

function Reminder() {
  const [loader, showloder, hidelodaer] = Pageimplement();
  const PPostTask =
    "https://z8sp8dl9if.execute-api.eu-west-2.amazonaws.com/dev/10057/tasks";
  const PGetAllTask = `https://z8sp8dl9if.execute-api.eu-west-2.amazonaws.com/dev/10057/tasks`;

  const [ParentTask, setParentTask] = useState({
    title: "",
    status: false,
    dueDate: "",
    tasks: [],
  });

  const [listPost, setlistPost] = useState([]);
  const getAllTask = async () => {
    try {
      showloder();
      const data = await axios.get(PGetAllTask);
      setlistPost(data.data.reverse());
      hidelodaer();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTask();
  }, []);

  // const renderHeader = () => {
  //   let headerElement = ["Title", "Status", "DueDate"];
  //   return headerElement.map((key, index) => {
  //     return <th key={index}>{key.toUpperCase()}</th>;
  //   });
  // };
  const renderBody = () => {
    return (
      listPost &&
      listPost.map((iterateParentList, index) => {
        const yesterday = new Date().setDate(new Date().getDate() - 1);
        console.log(yesterday);

        if (iterateParentList.status === false) {
          iterateParentList.status = "Pending";
        } else if (iterateParentList.status === true) {
          iterateParentList.status = "Completed";
        } else {
          console.log("not fount");
        }
        if (iterateParentList.id !== undefined) {
          if (
            (new Date(iterateParentList.dueDate).toDateString() ===
              new Date().toDateString() ||
              new Date(iterateParentList.dueDate).toDateString() ===
                new Date(yesterday).toDateString()) &&
            iterateParentList.status == "Pending"
          ) {
            return (
              <div>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>DueDate</th>
                </tr>
                <tr key={iterateParentList.id}>
                  <td>{iterateParentList.title}</td>
                  <td>{iterateParentList.status}</td>
                  <td>{iterateParentList.dueDate}</td>
                </tr>

                <div>
                  {check_child_task(iterateParentList.tasks) ? (
                    <div>
                      {display_subTask(
                        iterateParentList.tasks,
                        iterateParentList.id
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          }
        }
      })
    );
  };

  const check_child_task = (task1) => {
    if (task1 === undefined) return false;
    else return true;
  };

  const display_subTask = (Task, pid) => {
    return Task.map((subTask) => (
      <div>
        <td>{subTask.title}</td>
        <td>{subTask.status}</td>
        <td>{subTask.dueDate}</td>

        {check_child_task(subTask.tasks) ? (
          <div>{display_subTask(subTask.tasks)}</div>
        ) : null}
      </div>
    ));
  };
  return (
    <div className="container-home">
      <h1>Reminder</h1>
      <div className="row-home">
        <div className="table-contain1">
          <table id="Post1">
            {/* <thead>
              <tr>{renderHeader()}</tr>
            </thead> */}
            <tbody>{renderBody()}</tbody>
          </table>
        </div>
      </div>
      {loader}
    </div>
  );
}

export default Reminder;
