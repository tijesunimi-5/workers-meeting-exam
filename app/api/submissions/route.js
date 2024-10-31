import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("data");
    const collection = db.collection("user-details");

    const submissions = await collection.find({}).toArray();

    return new Response(JSON.stringify({ success: true, data: submissions }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      Json.stringify({ success: false, error: error.message }),
      {
        status: 500,
      }
    );
  }
}
