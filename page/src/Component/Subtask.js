import React, { useState, useEffect } from "react";
import axios from "axios";
import Pageimplement from "./Pageimplement";
import { Link, useHistory, useParams } from "react-router-dom";
import AlertMsg from "./AlertMessage";
function Subtask() {
  const PPostTask =
    "https://z8sp8dl9if.execute-api.eu-west-2.amazonaws.com/dev/10057/tasks";
  const PGetAllTask = `https://z8sp8dl9if.execute-api.eu-west-2.amazonaws.com/dev/10057/tasks`;

  const [ParentTask, setParentTask] = useState({
    title: "",
    status: "Pending",
    dueDate: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [subTaskList, setSubTaskList] = useState([]);
  const [loader, showLoder, hideLodaer] = Pageimplement();

  const { id } = useParams();

  let history = useHistory();
  console.log(id);

  const { title, status, dueDate } = ParentTask;
  const [isTitleValid, setTileValid] = useState(false);
  const [isDate, setDate] = useState(false);
  const [isDisable, setDisable] = useState(true);

  const handleOnDateChange = (e) => {
    setParentTask({ ...ParentTask, [e.target.name]: e.target.value });

    setDisable(false);

    var selectDate = new Date(e.target.value);
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    selectDate.getHours(0, 0, 0, 0);
    console.log(selectDate);
    console.log(now);
    if (selectDate < now) {
      setDate(true);
      // setParentTask({ ...ParentTask, [e.target.name]: null });
    } else {
      setDate(false);
      // setParentTask({ ...ParentTask, [e.target.name]: e.target.value });
    }
  };

  const handleOnTitleChange = (e) => {
    setParentTask({ ...ParentTask, [e.target.name]: e.target.value });

    // setDisable(false);

    if (e.target.value.length > 0 && e.target.value.length < 2) {
      setTileValid(true);
    } else {
      setTileValid(false);
    }
  };

  const handleOnSubmitPtask = async (e) => {
    e.preventDefault();
    showLoder();
    await axios
      .post(
        `https://z8sp8dl9if.execute-api.eu-west-2.amazonaws.com/dev/10057/tasks/${id}`,
        ParentTask
      )
      .then((res) => {
        setSubTaskList([...subTaskList, { ParentTask: ParentTask }]);
        console.log(res.data);
        hideLodaer();
        setNotify({
          isOpen: true,
          message: "Added SubTask Successfully",
          type: "success",
        });
      });
    // history.push("/");
  };

  function canBeSubmitted() {
    const { title, status, dueDate } = ParentTask;
    return title.length > 0 && dueDate.length > 0;
  }
  return (
    <div className="container-home">
      <h1>Add SubTask TO-DO-List</h1>
      <div className="row-home">
        <div className="form-Addlist">
          <form onSubmit={(e) => handleOnSubmitPtask(e)}>
            <input
              type="text"
              placeholder="Enter Title"
              name="title"
              value={title}
              onChange={(e) => handleOnTitleChange(e)}
            ></input>
            {isTitleValid && (
              <div
                style={{
                  color: "red",
                  paddingBottom: 10,
                  position: "fixed",
                  marginLeft: "-39pxpx",
                }}
              >
                {"Title must be more than two charater.. "}
              </div>
            )}
            <input
              type="date"
              placeholder="Enter Due date"
              name="dueDate"
              value={dueDate}
              onChange={(e) => handleOnDateChange(e)}
            ></input>
            {isDate && (
              <div
                style={{
                  color: "red",
                  paddingBottom: 10,
                  position: "fixed",
                  right: "604px",
                }}
              >
                {"Select Futrue Date"}
              </div>
            )}
            <input
              type="submit"
              value="Add"
              className="btn-addtask"
              disabled={
                title.length >= 2 &&
                !isDisable &&
                (new Date(dueDate) > new Date() ||
                  new Date(dueDate).setHours(0, 0, 0, 0) -
                    new Date().setHours(0, 0, 0, 0) ===
                    0)
                  ? false
                  : true
              }
            ></input>
          </form>
        </div>
      </div>
      <Link to="/">
        <AlertMsg notify={notify} setNotify={setNotify} />
      </Link>
      {loader}
    </div>
  );
}

export default Subtask;
