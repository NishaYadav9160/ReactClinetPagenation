import React, { useState } from "react";
import Select from "react-select";

// import Home from './Home';

function Setting() {
  var colors = [
    {
      value: 1,
      label: "red",
    },
    {
      value: 2,
      label: "Green",
    },
    {
      value: 3,
      label: "orange",
    },
    {
      value: 4,
      label: "Blue",
    },
    {
      value: 5,
      label: "Black",
    },
  ];

  var [setcolor, ddlvalue] = useState(colors.label);
  var ddhandle = (e) => {
    ddlvalue(e.label);
  };
  return (
    <div>
      <form className="form-Addlist">
        <style>{"body{ color:" + setcolor + "}"}</style>
        <style>{".navbar{ background-color:" + setcolor + "}"}</style>
        <style>{".table-btn{ color:" + setcolor + "}"}</style>
        <div className="input-select-set">
          <Select
            name="status"
            placeholder="setting"
            options={colors}
            onChange={ddhandle}
          ></Select>
        </div>
      </form>
    </div>
  );
}
export default Setting;
