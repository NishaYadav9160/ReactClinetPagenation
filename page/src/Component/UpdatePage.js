import React, { useState, useEffect } from "react";
import axios from "axios";
import Pageimplement from "./Pageimplement";
import { useHistory, useParams } from "react-router-dom";
import AlertMsg from "./AlertMessage";
import { Link } from "react-router-dom";
const UpdatePage = () => {
  const PPostTask =
    "https://z8sp8dl9if.execute-api.eu-west-2.amazonaws.com/dev/10057/tasks";
  const PGetAllTask = `https://z8sp8dl9if.execute-api.eu-west-2.amazonaws.com/dev/10057/tasks`;

  const [ParentTask, setParentTask] = useState({
    title: "",
    status: false,
    dueDate: "",
  });
  const [listPost, setlistPost] = useState([]);
  const [loader, showLoder, hideLodaer] = Pageimplement();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const { id } = useParams();
  let history = useHistory();

  const { title, status, dueDate } = ParentTask;

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    const result = await axios.get(
      `https://z8sp8dl9if.execute-api.eu-west-2.amazonaws.com/dev/10057/tasks/${id}`
    );
    console.log(result);
    setParentTask(result.data);
  };

  const handleOnChange = (e) => {
    setParentTask({ ...ParentTask, [e.target.name]: e.target.value });
  };
  function handleOnSubmitPtask(e) {
    showLoder();
    axios
      .put(
        `https://z8sp8dl9if.execute-api.eu-west-2.amazonaws.com/dev/10057/tasks/${id}`,
        ParentTask
      )
      .then((res) => {
        setlistPost([...listPost, { ParentTask: ParentTask }]);

        hideLodaer();

        setNotify({
          isOpen: true,
          message: "Updated Successfully",
          type: "success",
        });
        //  history.push("/");
      })
      .catch((err) => console.log(err));
    e.preventDefault();
  }

  function canBeSubmitted() {
    const { title, status, dueDate } = ParentTask;
    return title.length > 0 && dueDate.length > 0;
  }

  return (
    <div className="container-home">
      <h1>Edit TO-Do-List</h1>
      <div className="row-home">
        <div className="form-Addlist">
          <form onSubmit={(e) => handleOnSubmitPtask(e)}>
            <input
              type="text"
              placeholder="Enter Title"
              name="title"
              value={title}
              onChange={(e) => handleOnChange(e)}
            ></input>
            <select
              name="status"
              value={status}
              onChange={(e) => handleOnChange(e)}
            >
              <option value="select">--Select Status--</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>
            <input
              type="date"
              placeholder="Enter Due date"
              name="dueDate"
              value={dueDate}
              onChange={(e) => handleOnChange(e)}
            ></input>
            <input
              type="submit"
              value="Update"
              className="btn-addtask"
              disabled={!canBeSubmitted()}
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
};

export default UpdatePage;
