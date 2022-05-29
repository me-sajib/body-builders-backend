const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

//

app.get("/", (req, res) => {
  res.send("Hello World");
});

const uri =
  "mongodb+srv://bodyBuildersDB:ugOMG4pCk7jlRy5Q@cluster0.gttgi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const buildersCollection = client.db("bodyBuilders").collection("services");
    const enrollCollection = client.db("bodyBuilders").collection("enrolled");

    // get all services data
    app.get("/services", async (req, res) => {
      const cursor = buildersCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });

    // add data and send to database
    app.post("/services", async (req, res) => {
      const query = req.body;
      const addData = await buildersCollection.insertOne(query);
      res.send(addData);
    });

    // enroll user to the course
    app.post("/enroll", async (req, res) => {
      const query = req.body;
      const enrollUser = await enrollCollection.insertOne(query);
      res.send(enrollUser);
    });

    // enroll user to the course
    app.get("/enroll/:id", async (req, res) => {
      const id = req.params.id;
      const cursor = enrollCollection.find({ email: id });
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir());

app.listen(port, () => {
  console.log("running app");
});
