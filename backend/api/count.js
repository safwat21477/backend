require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
let client = null;
let clientPromise = null;

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

module.exports = async (req, res) => {
  try {
    await clientPromise;
    const db = client.db("pharmacy");
    const collection = db.collection("products");
    const count = await collection.countDocuments({});
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ count });
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ error: err.message });
  }
}; 