import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { userData, userAnswer } = await req.json();

    const client = await clientPromise;
    const db = client.db("data");
    const collection = db.collection("user-details");

    const result = await collection.insertOne({ userData, userAnswer });

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
