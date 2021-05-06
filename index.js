const express = require("express");
const app = express(); // handles routing
const users = require("./users.json");
const fs = require("fs");
//.get,.post,.put,.delete are valid methods

app.use(express.json());
app.use(express.urlencoded());
app.get("/", function (req, res) {
  res.send("hello world");
});

app.get("/books", function (req, res) {
  res.send("There are 4 books at the store");
});

app.post("/", function (req, res) {
  res.send("This is a post request");
});

app.get("/users", (req, res) => {
  //fetch all users
  //send the users array as response to the client
  return res.json({ users });
});

app.post("/users", (req, res) => {
  console.log(req.body.newUser);
  //creat a new user from client's request
  //save new user to existing database
  users.push(req.body.newUser);
  //save updated data to users json
  //strigify the json data
  let stringData = JSON.stringify(users, null, 2);
  fs.writeFile("users.json", stringData, function (err) {
    if (err) {
      return res.status(500).json({ message: err });
    }
  });
  //rewrite the file users json
  //send back a response to client
  return res.status(200).json({ message: "new user created" });
});
//fetch single user
app.get("/users/:id", (req, res) => {
  //fetch requst.params id
  let id = req.params.id;
  //find users with id
  let foundUser = users.find((users) => {
    return String(users.id) === id;
  });
  if (foundUser) {
    return res.status(200).json({ user: foundUser });
  } else {
    return res.status(404).json({ message: "user not found" });
  }

  //return user object as response
  //return 404 error if user not found
});

app.listen(3000, function () {
  console.log("Server is up and running");
});
