const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");

const nameSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});

const User = mongoose.model('User', nameSchema);

app.get("/", (req, res) => {
 res.sendFile(__dirname + "/index.html");
});

app.post("/addname", (req, res) => {
  const myData = new User(req.body);
  myData.save()
  .then(item => {
    res.status(200).send("Item saved to the database.");
  })
  .catch(err => {
    res.status(400).send("Unable to save to the database.");
  });
});

 
app.listen(port, () => {
 console.log("Server listening on port " + port);
});