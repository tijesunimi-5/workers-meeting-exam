import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    // Check if the MongoDB URI is available
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    console.log("MongoDB URI is available");

    const client = await clientPromise;
    if (!client) throw new Error("Failed to initialize MongoDB client");

    console.log("MongoDB client initialized");

    const db = client.db("data");
    console.log("Connected to database:", db.databaseName);

    const collection = db.collection("user-details");
    console.log("Retrieved collection:", collection.collectionName);

    const submissions = await collection.find({}).toArray();
    console.log("Fetched submissions:", submissions);

    return new Response(JSON.stringify({ success: true, data: submissions }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in /api/submissions:", error.message);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
