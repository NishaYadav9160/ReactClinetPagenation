import React, { Component } from "react";
import { connect } from "react-redux";
class Display extends Component {
  render() {
    return (
      <div>
        <h1>Display</h1>
        <h1>Couter For Search : {this.props.searchCount}</h1>
        <h1>Couter For Next : {this.props.nextCount}</h1>
        <h1>Couter For Previous : {this.props.prevCount}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchCount: state.searchCount,
    nextCount: state.nextCount,
    prevCount: state.prevCount,
  };
};

export default connect(mapStateToProps, null)(Display);
