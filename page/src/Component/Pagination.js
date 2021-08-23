import React, { Component } from "react";
import { connect } from "react-redux";
class Pagination extends Component {
  state = {
    isDisablebtn: true,
  };

  componentDidMount() {}

  donextbtn = () => {
    this.props.setNextCount(this.props.nextCount + 1);
    this.props.callOnNext();
  };

  doPreviousbtn = () => {
    this.props.setPrevCount(this.props.prevCount + 1);
    this.props.callOnPrev();
  };

  onSelectoption = (pageSize) => {
    this.props.onChnageOfPageSize(pageSize);
  };

  render() {
    return (
      <div className="container-home">
        Row per page
        <select
          name="option-select"
          className="custom"
          value={this.props.showPerPage}
          onChange={(e) => this.onSelectoption(e.target.value)}
        >
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
        <span>
          {this.props.startIndex + 1}/
          {this.props.endIndex <= this.props.totalRecords
            ? this.props.endIndex
            : this.props.totalRecords}{" "}
          of
          {this.props.totalRecords}
        </span>
        <input
          type="submit"
          value="<"
          className="btn-addtask"
          onClick={this.doPreviousbtn}
          disabled={
            this.props.startIndex > 0 && this.state.isDisablebtn ? false : true
          }
        ></input>
        <input
          type="submit"
          value=">"
          onClick={this.donextbtn}
          disabled={
            this.props.endIndex >= this.props.totalRecords &&
            this.state.isDisablebtn
              ? true
              : false
          }
          className="btn-addtask"
        ></input>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nextCount: state.nextCount,
    prevCount: state.prevCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNextCount: (response) =>
      dispatch({
        type: "NEXT_COUNT",
        payload: response,
      }),
    setPrevCount: (response) =>
      dispatch({
        type: "PREV_COUNT",
        payload: response,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
