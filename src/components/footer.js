import React, { Component } from "react";
import "./footer.css";
class Footer extends Component {
  state = {};
  render() {
    return (
      <footer className="page-footer font-small bg-dark bottom-fixed">
        <div className="footer-copyright text-center py-3">
          © 2019 Copyright
          <a href="/"> JAMS</a>
        </div>
      </footer>
    );
  }
}

export default Footer;
