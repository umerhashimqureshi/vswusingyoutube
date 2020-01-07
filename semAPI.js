var cors = require("cors");
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
mongoose
  .connect("mongodb://localhost/Project")
  .then(() => console.log("Connected to Database."));

var songCP = [];

const songSchema = new mongoose.Schema({
  title: String,
  channelTitle: String,
  description: String,
  videoSrc: String
});

const historySchema = new mongoose.Schema({
  title: String,
  channelTitle: String,
  videoSrc: String
});

const mongoModel = mongoose.model("song", songSchema);
const historyModel = mongoose.model("recents", historySchema);

app.get("/showPlaylist", (req, res) => {
  //res.send(songCP);
  mongoModel.find((err, songs) => {
    if (err) {
      console.log(err);
    } else {
      res.json(songs);
    }
  });
});

app.delete("/deleteFromPlaylist/:title", (req, res) => {
  mongoModel.deleteMany({ title: req.params.title }, function(err) {
    if (err) {
      res.join(err);
      console.log(err);
    } else {
      res.json("Successfully removed");
      console.log("Successfully removed");
    }
  });
});

app.delete("/deleteByTitle/:title", (req, res) => {
  mongoModel.deleteMany({ title: req.params.title }, function(err) {
    if (err) {
      res.join(err);
      console.log(err);
    } else {
      res.json("Successfully removed");
      console.log("Successfully removed");
    }
  });
});

app.get("/findPlaylist", (req, res) => {
  //res.send(songCP);
  mongoModel.find((err, playlist) => {
    if (err) {
      console.log(err);
    } else {
      res.json(playlist);
    }
  });
});

app.get("/showRecents", (req, res) => {
  //res.send(songCP);
  historyModel.find((err, history) => {
    if (err) {
      console.log(err);
    } else {
      res.json(history);
    }
  });
});

app.post("/newPlaylist", (req, res) => {
  var newS = {
    name: req.body.name
  };
  songCP.push(newS);
  res.send(songCP);
});

app.post("/recentHistory", (req, res) => {
  var searchHistory = new historyModel({
    title: req.body.title,
    channelTitle: req.body.channelTitle,
    videoSrc: req.body.videoSrc
  });
  searchHistory.save();
  console.log(searchHistory);
});

app.delete("/deleteFromRecents/:title", (req, res) => {
  historyModel.deleteMany({ title: req.params.title }, function(err) {
    if (err) {
      res.join(err);
      console.log(err);
    } else {
      res.json("Successfully removed");
      console.log("Successfully removed");
    }
  });
});

// async function createNewSong(name, channel, descr, src) {
//   var newS = new mongoModel({
//     title: req.body.title,
//     channelTitle: req.body.channelTitle,
//     description: req.body.description,
//     videoSrc: req.body.videoSrc
//   });
//   const result = await newS.save();
//   songCP.push(result);
//   console.log(result);
// }

app.post("/newSong", (req, res) => {
  var newS = new mongoModel({
    title: req.body.title,
    channelTitle: req.body.channelTitle,
    description: req.body.description,
    videoSrc: req.body.videoSrc
  });
  newS.save();
  songCP.push(newS);
  console.log(newS);
});

app.get("/showAll", (req, res) => {
  mongoModel.find({ name: "hunza" }, function(error, searchR) {
    console.log(searchR);
    res.send(searchR);
  });
});

app.get("/showPlaylistR", (req, res) => {
  res.send(mongoModel.find({}));
});

app.listen(4000, () => {
  console.log("Listening at 4000");
});
