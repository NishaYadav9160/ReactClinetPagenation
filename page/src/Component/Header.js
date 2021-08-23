import React from "react";
import "../FormStyle.css";

const Header = () => {
  return (
    <div>
      <div>
        <div className="navbar">
          <a className="active" href="#">
            pagination Demo
          </a>
          <a className="Link-menu" href="/">
            {" "}
            Home
          </a>
          <a className="Link-menu" href="/display">
            {" "}
            Display
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
