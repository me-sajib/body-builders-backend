const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

//

app.get("/", (req, res) => {
  res.send("Hello World");
});

const uri =
  "mongodb+srv://bodyBuildersDb:ugOMG4pCk7jlRy5Q@cluster0.gttgi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const buildersCollection = client.db("bodyBuilders").collection("services");
    // get all services
    app.get("/services", async (req, res) => {
      const result = await buildersCollection.find({}).toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir());

app.listen(port, () => {
  console.log("running app");
});
