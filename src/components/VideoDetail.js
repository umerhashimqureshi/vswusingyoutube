import React, { useState, useEffect } from "react";
import { Paper, Typography } from "@material-ui/core";
import axios from "axios";
import Button from "@material-ui/core/Button";

export default ({ video }, props) => {
  if (!video) return <div> </div>;
  const [name, setName] = useState("Add to Playlist");
  const [state, setState] = useState(true);
  const [color, setColor] = useState("primary");
  var status = false;
  var arr = [];
  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  const title = video.snippet.title;
  const channelTitle = video.snippet.channelTitle;
  const description = video.snippet.description;

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/findPlaylist")
  //     .then(response => {
  //       setPlaylist(response.data);
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // });
  // console.log(setPlaylist);
  const handleSave = () => {
    setState(!state);
    console.log(state);
    if (state == true) {
      setName("Remove from Playlist");
      setColor("secondary");
      axios
        .post("http://localhost:4000/newSong", {
          title,
          channelTitle,
          description,
          videoSrc
        })
        .then(res => {
          console.log(res.data);
        });
    } else {
      setName("Add to Playlist");
      setColor("primary");
      axios
        .delete("http://localhost:4000/deleteByTitle/" + title)
        .then(() => console.log("Deleted"))
        .catch(err => {
          console.log(err);
          console.log("Fuck");
        });
    }
    // if (state == true) {
    //   setName("Add to Playlist");
    //   setColor("primary");
    //   axios
    //     .delete("http://localhost:4000/deletebySRC/" + videoSrc)
    //     .then(() => console.log("Deleted"))
    //     .catch(err => {
    //       console.log(err);
    //       console.log("Fuck");
    //     });
    // } else {
    //   setName("Remove from Playlist");
    //   setColor("secondary");
    //   axios
    //     .post("http://localhost:4000/newSong", {
    //       title,
    //       channelTitle,
    //       description,
    //       videoSrc
    //     })
    //     .then(res => {
    //       console.log(res.data);
    //     });
    // }
  };
  return (
    <React.Fragment>
      <Paper elevation={6} style={{ height: "70%" }}>
        <iframe
          frameBorder="0"
          height="100%"
          width="100%"
          title="Video Player"
          src={videoSrc}
        />
      </Paper>
      <Paper elevation={6} style={{ padding: "15px" }}>
        <Typography variant="h4">
          {title} - {channelTitle}
        </Typography>
        <Typography variant="subtitle1">{channelTitle}</Typography>
        <Typography variant="subtitle2">{description}</Typography>

        <Button
          variant="contained"
          color={color}
          href="#contained-buttons"
          onClick={handleSave}
        >
          {name}
        </Button>
      </Paper>
    </React.Fragment>
  );
};
