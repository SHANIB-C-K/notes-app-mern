const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const mongoose = require("mongoose");

const dataModel = require("./model/model");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/crud/");

//create user section
app.post("/create", (req, res) => {
  dataModel
    .create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// data get
app.get("/", (req, res) => {
  dataModel
    .find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// update data
app.get("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  dataModel
    .findById({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  dataModel
    .findByIdAndUpdate(
      { _id: id },
      { name: req.body.name, email: req.body.email, age: req.body.age },
      { new: true } // Return the modified document
    )
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

//delete
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  dataModel
    .findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.listen(port, (req, res) => {
  console.log(`Server is running at http://localhost:${port}`);
});