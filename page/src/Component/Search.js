import React, { Component } from "react";
import { connect } from "react-redux";

class Search extends Component {
  state = {
    title: "",
    isTitleVaild: false,
    isDisablebtn: true,
  };

  handleOnTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    });

    if (e.target.value.length > 0 && e.target.value.length < 2) {
      this.setState({
        isTitleVaild: true,
      });
    } else {
      this.setState({
        isTitleVaild: false,
      });
    }
  };

  submitonSearch = (e) => {
    e.preventDefault();

    this.props.setSearchCount(this.props.searchCount + 1);
    this.props.filterlist(this.state.title);
  };

  render() {
    const { title, isDisablebtn, isTitleVaild } = this.state;

    return (
      <div className="container-home">
        <div className="form-Addlist">
          {" "}
          <form>
            <input
              type="text"
              placeholder="Search Any Item"
              name="title"
              value={title}
              onChange={this.handleOnTitleChange}
            ></input>
            {isTitleVaild && (
              <div
                style={{
                  color: "red",
                  paddingBottom: 10,
                  position: "fixed",
                  marginLeft: "-3%",
                }}
              >
                {"Title must be more than two charater"}
              </div>
            )}
            <input
              type="submit"
              value="Search"
              className="btn-addtask"
              disabled={title.length >= 2 && isDisablebtn ? false : true}
              onClick={this.submitonSearch}
            ></input>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchCount: state.searchCount,
    nextCount: state.nextCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSearchCount: (response) =>
      dispatch({
        type: "SERACH_COUNT",
        payload: response,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
