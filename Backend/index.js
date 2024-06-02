const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/crud")
  .then(() => {
    console.log("mongodb connectrd successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// mongoose model create
const dataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  paragraph: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const collection = mongoose.model("collection", dataSchema);

//create user section
app.post("/create", (req, res) => {
  const { title, paragraph, username } = req.body;
  const data = {
    title: title,
    paragraph: paragraph,
    username: username,
  };
  collection.insertMany([data]);
});

// data get
app.get("/", (req, res) => {
  collection
    .find({})
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// register authentication

const AuthSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const authentication = mongoose.model("authentication", AuthSchema);

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const findEmail = await authentication.findOne({ email });
  if (findEmail) {
    res.json("email already exist");
  } else {
    const encrypedPassword = await bcrypt.hash(password, 10);
    const authData = {
      email: email,
      password: encrypedPassword,
    };
    authentication.insertMany(authData);
    res.json("registered successfully");
  }
});

// login authentication
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const findEmail = await authentication.findOne({ email });
  if (findEmail) {
    const passwordMatch = await bcrypt.compare(password, findEmail.password);
    if (passwordMatch) {
      res.json("loged in");
    } else {
      res.json("password not match");
    }
  } else {
    res.json("email not found");
  }
});

// update data
app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const filterId = { _id: new ObjectId(id) };
  const findId = await collection.findOne(filterId);
  if (findId) {
    const updateData = {
      $set: { title: req.body.title, paragraph: req.body.paragraph },
    };
    await collection.updateOne(filterId, updateData);
    res.json("updated successfully");
  } else {
    res.json("id not found");
  }
});

app.get("/updateUser/:id", async (req, res) => {
  const id = req.params.id;

  const result = await collection.findOne({ _id: new ObjectId(id) });
  if (result) {
    res.json(result);
  }
});

// delete function
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const filterId = { _id: new ObjectId(id) };
  const findId = await collection.findOne(filterId);
  if (findId) {
    await collection.deleteOne(filterId);
    res.json("deleted successfully");
    } else {
      res.json("id not found");
      }
});

app.listen(8000, (req, res) => {
  console.log(`Server is running at http://localhost:8000`);
});
