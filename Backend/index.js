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
  const { id, title, paragraph } = req.body;
  const findId = await collection.findOne({ id });
  if (findId) {
    const updateData = {
      title: title,
      paragraph: paragraph,
    };
    collection.updateOne({ id }, { $set: updateData });
    res.json("updated successfully");
  } else {
    res.json("email not found");
  }
});

app.get("/update/:id", async (req, res) => {
  const id = req.params.id;

  const result = await collection.findOne({ _id: new ObjectId(id) });
  if (result) {
    res.json(result)
  }
});
app.listen(8000, (req, res) => {
  console.log(`Server is running at http://localhost:8000`);
});
