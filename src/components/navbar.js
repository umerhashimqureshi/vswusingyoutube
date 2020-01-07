import React, { Component } from "react";
import { Switch, Link, Route, BrowserRouter as Router } from "react-router-dom";
import "./navbar.css";
import Signup from "./signup";
import Playlist from "./playlist";
import SearchHistory from "./SearchHistory";
import { Button } from "@material-ui/core";
import history from "./history";

const Navbar = props => {
  return (
    <Router history={history}>
      <nav className="navbar navbar-expand-md bg-dark navbar-dark">
        <a className="navbar-brand" href="/">
          &nbsp;JAMS
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item mr-2">
              <Link className="nav-link" to="/">
                Login
              </Link>
            </li>
            <li className="nav-item ml-2">
              <Link className="nav-link" to="/">
                Signup
              </Link>
            </li>
            <li className="nav-item mr-2">
              <Link className="nav-link" to={"/playlist"}>
                Playlist
              </Link>
              {/* <Button onClick={() => history.push("/playlist")}>
                Playlist
              </Button> */}
            </li>
            <li className="nav-item mr-2">
              <Link className="nav-link" to={"/recents"}>
                Recents
              </Link>
              {/* <Button onClick={() => history.push("/playlist")}>
                Playlist
              </Button> */}
            </li>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route path="/signup" />
        <Route path="/login" />
        <Route path="/playlist" component={Playlist} />
        <Route path="/recents" component={SearchHistory} />
      </Switch>
    </Router>
  );
};

export default Navbar;
