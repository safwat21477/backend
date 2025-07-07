const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://abdallasafwat29:1325@cluster0.tnu0ygj.mongodb.net/pharmacy?retryWrites=true&w=majority";
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
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({ count }, null, 2));
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ error: err.message });
  }
}; 