import React, { Component } from "react";
import { Button, Jumbotron } from "reactstrap";
import axios from "axios";
import Header from "./Header";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      button: "Stop",
      flag: 1
    };

    this.handleUpload = this.handleUpload.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }
  handleUpload() {
    const { flag } = this.state;
    const obj = {
      flag
    };
    axios
      .post("http://localhost:8080/employee/add", obj)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }
  handleStop() {
    const { button } = this.state;
    if (button === "Stop") {
      axios
        .get(`http://localhost:8080/employee/stop`)
        .then(res => {
          this.setState({ flag: res.flag });
        })
        .catch(err => console.log(err));

      this.setState({ button: "Resume" });
    } else if (button === "Resume") {
      axios
        .get(`http://localhost:8080/employee/resume`)
        .then(res => {
          this.setState({ flag: res.flag });
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
            <div className="card-header">
              <Header />
            </div>
            <div className="card-body">
              <Jumbotron>
                <h1 className="display-3">Collect</h1>

                <hr className="my-2" />
                <p className="content">
                  Click Upload to start uploading data and Stop to terminate the
                  uploading
                </p>
                <br />
                <div className="row">
                  <div className="col-md-3">
                    <Button className="buttonUpload" onClick={this.handleUpload}>
                      Upload
                    </Button>
                  </div>

                  <div className="col-md-3">
                    <Button className="buttonStop" onClick={this.handleStop}>
                      {this.state.button}
                    </Button>
                  </div>
                </div>
              </Jumbotron>

              <div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Main;
