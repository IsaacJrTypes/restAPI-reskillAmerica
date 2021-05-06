const express = require("express");
const app = express(); // handles routing
const posts = require("./posts.json");
const fs = require("fs");
//.get,.post,.put,.delete are valid methods

app.use(express.json());
app.use(express.urlencoded());

app.get("/posts", (req, res) => {
  //fetch all users
  //send the users array as response to the client
  return res.json({ posts });
});

app.post("/posts", (req, res) => {
  console.log(req.body.newPost);
  //creat a new user from client's request
  //save new user to existing database
  posts.push(req.body.newPost);
  //save updated data to users json
  //strigify the json data
  let stringData = JSON.stringify(posts, null, 2);
  fs.writeFile("posts.json", stringData, function (err) {
    if (err) {
      return res.status(500).json({ message: err });
    }
  });
  //rewrite the file users json
  //send back a response to client
  return res.status(200).json({ message: "new post created" });
});
//fetch single user
app.get("/posts/:id", (req, res) => {
  //fetch requst.params id
  let id = req.params.id;
  //find users with id
  let foundPost = posts.find((posts) => {
    return String(posts.id) === id;
  });
  if (foundPost) {
    return res.status(200).json({ post: foundPost });
  } else {
    return res.status(404).json({ message: "post not found" });
  }
  //return user object as response
  //return 404 error if user not found
});

app.post("/posts/:id", (req, res) => {
  let stringData = JSON.stringify(posts, null, 2);
  fs.writeFile("posts.json", stringData, function (err) {
    if (err) {
      return res.status(500).json({ message: err });
    }
  });
  //rewrite the file users json
  //send back a response to client
  return res.status(200).json({ message: "new post created" });
});

app.listen(3000, function () {
  console.log("Server is up and running");
});
