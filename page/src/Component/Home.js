import React, { Component } from "react";
import Pagination from "./Pagination";
import Search from "./Search";
import Loader from "./Loader";
import TaskService from "../service/TaskService";
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      tasklist: [],
      loading: true,
      initialTasklist: [],
      startIndex: 0,
      endIndex: 5,
      showPerPage: 5,
      totalRecords: 0,
      filterListdata: [],
      datalist: "",
      errorMessage: "",
      isError: true,
    };
  }

  componentDidMount() {
    this.props.resetCount(0);
    this.dataLoad();
  }

  dataLoad = () => {
    TaskService.getAllTask()
      .then((res) => {
        const fetchedData = [];
        for (let key in res.data) {
          if (res.data[key].title !== undefined && res.data[key].title !== "") {
            fetchedData.push({ ...res.data[key], id: key });
          }
        }

        this.setState(
          {
            initialTasklist: fetchedData,
            totalRecords: fetchedData.length,
            loading: false,
          },
          () => {
            this.doPagination(this.state.startIndex, this.state.showPerPage);
          }
        );
      })
      .catch((err) => {
        this.setState({
          errorMessage: err.message,
          isError: false,
          loading: false,
        });
      });
  };

  callOnNext = () => {
    let startIndex = this.state.startIndex + parseInt(this.state.showPerPage);
    let endIndex =
      parseInt(this.state.endIndex) + parseInt(this.state.showPerPage);
    this.doPagination(startIndex, endIndex);
  };

  callOnPrev = () => {
    let startIndex = this.state.startIndex - parseInt(this.state.showPerPage);
    let endIndex =
      parseInt(this.state.endIndex) - parseInt(this.state.showPerPage);
    this.doPagination(startIndex, endIndex);
  };

  doPagination = (start, end) => {
    this.setState({
      startIndex: start,
      endIndex: end,
      tasklist: this.state.datalist
        ? this.state.filterListdata.slice(start, end)
        : this.state.initialTasklist.slice(start, end),
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState(
      {
        showPerPage: event.target.value,
        startIndex: 0,
        endIndex: 0,
      },
      () => {
        this.doPagination(this.state.startIndex, this.state.endIndex);
      }
    );
  };

  onChnageOfPageSize = (pageSize) => {
    let startvalue = 0;
    let endValue = pageSize;
    this.setState(
      {
        showPerPage: pageSize,
      },
      () => this.doPagination(startvalue, endValue)
    );
  };

  filterlist = (titlevalue) => {
    let searchList = this.state.initialTasklist.filter(
      (list) => list.title.toLowerCase().indexOf(titlevalue.toLowerCase()) > -1
    );
    this.setState({
      filterListdata: searchList,
      datalist: titlevalue,
    });

    if (searchList.length == 0) {
      this.setState({
        tasklist: [],
      });
    } else {
      this.setState({
        tasklist: searchList.slice(0, 5),
        totalRecords: searchList.length,
        startIndex: 0,
        endIndex: 5,
        showPerPage: 5,
      });
    }
  };

  render() {
    if (this.state.loading) return <Loader />;

    if (this.state.isError == true) {
      return (
        <div className="container-home">
          <h2>Display Task Name</h2>
          <div className="row-home">
            <div className="form-Addlist">
              <Search filterlist={this.filterlist} />
            </div>
          </div>
          <div className="row-home">
            <div className="center">
              <div className="loaded">
                <table>
                  <tr>
                    <th>Display Task Data</th>
                  </tr>
                  <tbody>
                    {this.state.tasklist.length > 0}
                    {this.state.tasklist &&
                      this.state.tasklist.map((iterateList, index) => (
                        <tr key={index}>
                          <td>{iterateList.title}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {this.state.tasklist.length > 0 ? (
            <div className="row-home">
              <div className="pagenation">
                <div className="form-Addlist1 ">
                  <Pagination
                    showPerPage={this.state.showPerPage}
                    totalRecords={this.state.totalRecords}
                    startIndex={this.state.startIndex}
                    endIndex={this.state.endIndex}
                    doPagination={this.doPagination}
                    callOnNext={this.callOnNext}
                    callOnPrev={this.callOnPrev}
                    onChnageOfPageSize={this.onChnageOfPageSize}
                    tasklist={this.state.tasklist}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>No records found for searched criteria</div>
          )}
          ;
        </div>
      );
    } else {
      return <div>Current faceing technical issue please try again. </div>;
    }
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    resetCount: (response) =>
      dispatch({
        type: "RESET_COUNT",
        payload: response,
      }),
  };
};
export default connect(null, mapDispatchToProps)(Home);
