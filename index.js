const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser());
app.use(cors());

const commentsBypostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const comments = commentsBypostId[req.params.id] || [];
  res.status(200).send(comments);
});

app.post("/posts/:id/comment", (req, res) => {
  const { comment } = req.body;
  const commentid = randomBytes(6).toString("hex");
  const dataMap = { id: commentid, comment };
  const comments = commentsBypostId[req.params.id] || [];
  comments.push(dataMap);
  commentsBypostId[req.params.id] = comments;
  res.status(201).send(comments);
});

app.listen(5000, () => {
  console.log("listening on 5000");
});
