import React, { Component } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./signup.css";
import Fade from "react-reveal/Fade";

class Signup extends Component {
  state = {};
  constructor() {
    super();
  }
  render() {
    return (
      <Fade>
        <div>
          <div id="signUp" className="container">
            <div className="form align">
              <h3>Sign Up</h3>
              <h4>Please fill in the form to create an account!</h4>
              <hr />
              <input id="fname" type="text" placeholder="First Name" />
              &nbsp;
              <input id="lname" type="text" placeholder="Last Name" />
              <br />
              <br />
              <input id="email" type="text" placeholder="Email" />
              <br />
              <br />
              <input id="pass" type="text" placeholder="Password" />
              <br />
              <br />
              <input id="cPass" type="text" placeholder="Confirm Password" />
              <br />
              <br />
              <input id="check" type="checkbox" /> I accept the{" "}
              <a href="#">Terms of Use</a> & <a href="#">Privacy Policy</a>.
              <br />
              <br />
              <button id="but" className="btn btn-primary" type="submit">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </Fade>
    );
  }
}

export default Signup;
