// Requires Start
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ClientSession } = require("mongodb");
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
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// Collection Start

const registerUsers = client.db("ATGServer").collection("registeredUser");

// Collection End

// CRUD run Function Start
const run = async () => {
  try {
    // Register User API Start
    app.post("/registerUser", async (req, res) => {
      const registerUser = req.body;
      const result = await registerUsers.insertOne(registerUser);
      res.send(result);
    });
    // Register User API End
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
