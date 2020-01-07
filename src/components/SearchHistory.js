import React, { Component } from "react";
import { Switch, Link, Route, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import { Grid, Button } from "@material-ui/core";

class SearchHistory extends Component {
  state = {};
  constructor(props) {
    super(props);
    // this.state = { title: "", channelTile: "", description: "", videoSrc: "" };
    this.state = { recentHistory: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/showRecents")
      .then(response => {
        this.setState({ recentHistory: response.data });
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  delete(title) {
    axios
      .delete("http://localhost:4000/deleteFromRecents/" + title)
      .then(() => console.log("Deleted"))
      .catch(err => {
        console.log(err);
        console.log("Fuck");
      });
  }

  render() {
    return (
      <div>
        <div className="container">
          <h3>Recents:</h3>
          <div className="d-flex flex-wrap justify-content-center">
            {this.state.recentHistory.map((recentHistory, i) => {
              return (
                <div key={i} style={{ width: "40%" }}>
                  <div className="card">
                    <iframe
                      frameBorder="0"
                      height="100%"
                      width="100%"
                      title="Video Player"
                      src={`https://www.youtube.com/embed/${recentHistory.videoSrc}`}
                    />
                    {recentHistory.title}
                    <br />
                    <b>{recentHistory.channelTitle}</b>
                    <Button
                      color="primary"
                      onClick={() => {
                        this.delete(recentHistory.title);
                        console.log(recentHistory._id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchHistory;
