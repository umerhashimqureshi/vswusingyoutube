import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import Navbar from "./components/navbar";
import { SearchBar, VideoList, VideoDetail } from "./components";
/* eslint-disable */
import youtube from "./api/youtube";
import axios from "axios";
import Footer from "./components/footer";
import Playlist from "./components/playlist";

export default () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  //const recents = [];

  return (
    <div>
      <Grid style={{ justifyContent: "center" }} container spacing={10}>
        <Grid item xs={11}>
          <Navbar />
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar onSubmit={handleSubmit} />
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={selectedVideo} />
            </Grid>
            <Grid item xs={4}>
              <VideoList videos={videos} onVideoSelect={setSelectedVideo} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <footer style={{ marginTop: "100%", width: "90%", marginLeft: "5%" }}>
        <Footer />
      </footer>
    </div>
  );

  async function handleSubmit(searchTerm) {
    const {
      data: { items: videos }
    } = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 7,
        key: process.env.REACT_APP_API_KEY,
        q: searchTerm
      }
    });

    setVideos(videos);
    setSelectedVideo(videos[0]);
    var title = videos[0].snippet.title;
    var channelTitle = videos[0].snippet.channelTitle;
    var videoSrc = videos[0].id.videoId;
    if (videos[0]) {
      axios
        .post("http://localhost:4000/recentHistory", {
          title,
          channelTitle,
          videoSrc
        })
        .then(res => {
          console.log(res.data);
        });
    }
    // console.log(JSON.stringify(setSelectedVideo.title));
    // recents.push(setSelectedVideo);
    // console.log(recents);
    //\  <Recents video={videos[0]} />;
    console.log(videos[0].snippet.title);
    console.log(videos[0].id.videoId);
  }
};
