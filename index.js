const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

// mongodb connection
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGODB_URI;

// firebase connection
const serviceAccount = require('./pawmart-zone-firebase-admin-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// verify firebase token
const verifyFirebaseToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Unauthorized access' });
  }
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized access' });
  }

  // verify token
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.token.email = decoded.email;
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized access' });
  }
};

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
    const ordersCollection = database.collection('orders');

    //  ========== ROUTES START ==========

    // health check
    app.get('/', (req, res) => {
      res.send('PawMart Server is Running!');
    });

    // --------------------------------------------------

    // Listings Collection APIs

    // get all listings & specific user's listings (by email using query params)
    app.get('/listings', async (req, res) => {
      try {
        const email = req.query.email;
        const query = {};
        if (email) {
          query.email = email;
        }
        const cursor = listingsCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Failed to fetch listings', error });
      }
    });

    // get recent 6 listings
    app.get('/listings/recent', async (req, res) => {
      try {
        const sortFields = { date: -1 };
        const limitNum = 6;
        const cursor = listingsCollection
          .find()
          .sort(sortFields)
          .limit(limitNum);
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Failed to fetch listings', error });
      }
    });

    // get single listing by ID
    app.get('/listings/:listingId', async (req, res) => {
      try {
        const id = req.params.listingId;
        const query = { _id: new ObjectId(id) };
        const result = await listingsCollection.findOne(query);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Failed to fetch listing', error });
      }
    });

    // get listings by category
    app.get('/listings/category/:name', async (req, res) => {
      try {
        const categoryName = req.params.name;
        const query = { category: categoryName };
        const cursor = listingsCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .send({ message: 'Failed to fetch filtered listings', error });
      }
    });

    // create new listing
    app.post('/listings', verifyFirebaseToken, async (req, res) => {
      try {
        const newListing = req.body;
        const result = await listingsCollection.insertOne(newListing);
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .send({ message: 'Failed to create new listing', error });
      }
    });

    // update listing
    app.put('/listings/:listingId', verifyFirebaseToken, async (req, res) => {
      try {
        const id = req.params.listingId;
        const updatedListing = req.body;
        const query = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: { ...updatedListing },
        };
        const result = await listingsCollection.updateOne(query, updateDoc);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Failed to update listing', error });
      }
    });

    // delete listing
    app.delete(
      '/listings/:listingId',
      verifyFirebaseToken,
      async (req, res) => {
        try {
          const id = req.params.listingId;
          const query = { _id: new ObjectId(id) };
          const result = await listingsCollection.deleteOne(query);
          res.send(result);
        } catch (error) {
          res.status(500).send({ message: 'Failed to delete listing', error });
        }
      }
    );

    // --------------------------------------------------

    // Orders Collection APIs

    // create new order
    app.post('/orders', verifyFirebaseToken, async (req, res) => {
      try {
        const newOrder = req.body;
        const result = await ordersCollection.insertOne(newOrder);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Failed to create new order', error });
      }
    });

    // get orders by user email
    app.get('/orders', verifyFirebaseToken, async (req, res) => {
      try {
        const email = req.query.email;
        const query = { email: email };
        const cursor = ordersCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Failed to fetch user orders', error });
      }
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
