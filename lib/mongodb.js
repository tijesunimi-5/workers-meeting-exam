import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  connectTimeoutMS: 20000,
};

let client;
let clientPromise;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().catch((error) => {
      console.error("MongoDB connection error:", error);
      throw error; // Rethrow to propagate the error
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect().catch((error) => {
    console.error("MongoDB connection error:", error);
    throw error; // Rethrow to propagate the error
  });
}

// Log a success message after successful connection
clientPromise
  .then(() => {
    console.log("MongoDB connection successful");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

export default clientPromise;
