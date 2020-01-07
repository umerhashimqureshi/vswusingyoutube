import React from "react";
import { Grid, Button } from "@material-ui/core";
import VideoDetail from "./VideoDetail";
//import { setSelectedVideo } from "../App";
import axios from "axios";
class Playlist extends React.Component {
  state = {};
  constructor(props) {
    super(props);
    // this.state = { title: "", channelTile: "", description: "", videoSrc: "" };
    this.state = { playlist: [{}] };
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/showPlaylist")
      .then(response => {
        this.setState({ playlist: response.data });
        // this.setState({
        //   title: response.data.title,
        //   channelTitle: response.data.channelTitle,
        //   description: response.data.description,
        //   videoSrc: response.data.videoSrc
        // });
        // console.log(response.data[0]);
        // console.log(typeof response.data[0]);
        // const str = JSON.stringify(response.data[0].title);
        // console.log(str);
        // console.log(typeof str);
        // const str2 = JSON.stringify(response.data[0].videoSrc);
        // console.log(str2);
        // console.log(
        //   this.state.title,
        //   this.state.channelTitle,
        //   this.state.description,
        //   this.state.videoSrc
        // );
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  delete(title) {
    axios
      .delete("http://localhost:4000/deleteFromPlaylist/" + title)
      .then(() => console.log("Deleted"))
      .catch(err => {
        console.log(err);
        console.log("Fuck");
      });
  }
  // delete() {
  //   axios.get('http://localhost:4000/deleteFromPlaylist/delete/' + this.props.obj._id)
  //     .then(console.log('Deleted'))
  //     .catch(err => console.log(err))
  // }

  render() {
    //const videoSrc = JSON.stringify(this.state.data[0]);
    //const check = videoSrc[0];
    // console.log(typeof videoSrc);
    // const checkkState = this.state;
    // console.log(checkkState);
    // console.log(check);
    // console.log(this.state.playlist);
    // console.log(this.state.playlist[0]);
    //console.log(this.state.playlist[0].videoSrc);

    return (
      <div>
        <div className="container">
          <h3>Playlist:</h3>
          <div className="d-flex flex-wrap justify-content-center">
            {this.state.playlist.map((playlist, i) => {
              return (
                <div key={i} style={{ width: "40%" }}>
                  <div className="card">
                    <iframe
                      frameBorder="0"
                      height="100%"
                      width="100%"
                      title="Video Player"
                      src={playlist.videoSrc}
                    />
                    {playlist.title}
                    <br />
                    <b>{playlist.channelTitle}</b>
                    {/* {console.log(playlist._id)} */}
                    <Button
                      color="primary"
                      onClick={() => {
                        this.delete(playlist.title);
                        console.log(playlist._id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          ;
        </div>
      </div>
    );
  }
}

export default Playlist;
