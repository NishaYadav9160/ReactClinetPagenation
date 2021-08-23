import React from "react";
import { Link } from "react-router-dom";
import Setting from "./Setting";
import "../Formbuild.css";

function Navbar() {
  return (
    <div>
      <div className="navbar">
        <a className="active" href="#">
          To DO List
        </a>
        <Link className="Link-menu" to="/">
          {" "}
          Home
        </Link>
        <Link className="Link-menu" to="/reminder">
          {" "}
          Reminder
        </Link>
        {/* <Link className="Link-menu" to="/update">
          Edit
        </Link> */}
        <Setting />
      </div>
    </div>
  );
}

export default Navbar;
