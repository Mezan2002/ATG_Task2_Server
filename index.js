// Requires Start
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {
  MongoClient,
  ServerApiVersion,
  ClientSession,
  ObjectId,
} = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
// Requires End

// Middle Wares Start
app.use(cors());
app.use(express.json());
// Middle Wares End

// Initial Setup Start

app.get("/", (req, res) => {
  res.send("ATG Server is Running");
});

// mongo DB setups start

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2ahck7i.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// Collection Start

const users = client.db("ATGServer").collection("registeredUser");
const posts = client.db("ATGServer").collection("posts");

// Collection End

// CRUD run Function Start

const run = async () => {
  try {
    // Register User API Start
    app.post("/registerUser", async (req, res) => {
      const registerUser = req.body;
      const result = await users.insertOne(registerUser);
      res.send(result);
    });
    // Register User API End

    // Login User API Start
    app.get("/loggedInUser", async (req, res) => {
      const userName = req.query.userName;
      const userPassword = req.query.userPassword;
      const query = { userName: userName, userPassword: userPassword };
      const result = await users.findOne(query);
      res.send(result);
    });
    // Login User API End

    // Create Post API Start
    app.post("/createPost", async (req, res) => {
      const post = req.body;
      const result = await posts.insertOne(post);
      res.send(result);
    });
    // Create Post API End

    // Get Post API Start
    app.get("/posts", async (req, res) => {
      const qeury = {};
      const post = await posts.find(qeury).toArray();
      res.send(post);
    });
    // Get Post API End

    // Get Single Post API Start
    app.get("/updatedPost/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await posts.findOne(query);
      res.send(result);
    });
    // Get Single Post API End

    // Update a Post API Start
    app.put("/postUpdated/:id", async (req, res) => {
      const id = req.params.id;
      const updatedPost = req.body.updatedPost;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          post: updatedPost,
        },
      };
      const result = await posts.updateOne(filter, updatedDoc, options);
      res.send(result);
    });
    // Update a Post API End

    // Delete Post API Start
    app.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await posts.deleteOne(query);
      res.send(result);
    });
    // Delete Post API End

    // Like Post API Start
    app.put("/like/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          like: "liked",
        },
      };
      const result = await posts.updateOne(filter, updatedDoc, options);
      res.send(result);
    });
    // Like Post API End
  } finally {
  }
};
run().catch((error) => console.log(error));

// CRUD run Function End

// mongo DB setups end

app.listen(port, () => {
  console.log(`ATG Server is Running on Port ${port}`);
});

// Initial Setup End
