import React, { Component } from "react";
import { Button } from "reactstrap";
import axios from "axios";
class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      button: "Stop"
    };

    this.handleUpload = this.handleUpload.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }
  handleUpload() {
    axios
      .post("http://localhost:8080/employee/add")
      .then(res => console.log(res.data));
    // .catch(err => console.log(err));
  }
  handleStop() {
    const { button } = this.state;
    if (button === "Stop") {
      const id = 0;
      axios
        .get(`http://localhost:5000/employee/stop`,{
          params:{
            flag: id

          }
        })
        .then(res => {
          this.setState({ flag: res });
        })
        .catch(err => console.log(err));
      this.setState({ button: "Resume" });
    } else if (button === "Resume") {
      const id = 1;
      axios
        .get(`http://localhost:5000/employee/stop`,{
          params:{
            flag:id
          }
        })
        .then(res => {
          this.setState({ flag: res });
        })
        .catch(err => console.log(err));
      this.setState({ button: "Stop" });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="animated fadeIn">
          <div className="card">
            <div className="card-header">Atlan Collect</div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <Button color="primary" onClick={this.handleUpload}>
                    Upload
                  </Button>
                </div>
                <div className="col-md-4">
                  <Button color="warning" onClick={this.handleStop}>
                    {this.state.button}
                  </Button>
                </div>
                <div className="col-md-4">
                  <Button color="danger">Terminate</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Main;
