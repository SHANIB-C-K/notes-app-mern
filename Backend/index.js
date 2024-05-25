const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

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
});

const collection = mongoose.model("collection", dataSchema);

//create user section
app.post("/create", (req, res) => {
  const { title, paragraph } = req.body;
  const data = {
    title: title,
    paragraph: paragraph,
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
    const authData = {
      email: email,
      password: password,
    };
    authentication.insertMany(authData);
  }
});

app.listen(8000, (req, res) => {
  console.log(`Server is running at http://localhost:8000`);
});
