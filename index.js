const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// mongodb connection
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db('PawMart_DB');
    const listingsCollection = database.collection('listings');

    //  ========== ROUTES START ==========

    // health check
    app.get('/', (req, res) => {
      res.send('PawMart Server is Running!');
    });

    // listings collection apis

    // all listings get & specific user's listings (by email)
    app.get('/listings', async (req, res) => {
      const email = req.query.email;
      const query = {};
      if (email) {
        query.email = email;
      }
      const cursor = listingsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // recent listings get (6)
    app.get('/listings/recent', async (req, res) => {
      const sortFields = { date: -1 };
      const limitNum = 6;
      const cursor = listingsCollection.find().sort(sortFields).limit(limitNum);
      const result = await cursor.toArray();
      res.send(result);
    });

    // specific listing get
    app.get('/listings/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await listingsCollection.findOne(query);
      res.send(result);
    });

    // new listing create
    app.post('/listings', async (req, res) => {
      const newListing = req.body;
      const result = await listingsCollection.insertOne(newListing);
      res.send(result);
    });

    // listing delete
    app.delete('/listings/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await listingsCollection.deleteOne(query);
      res.send(result);
    });

    //  ========== ROUTES END ==========

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`PawMart server running on port ${port}`);
});
