import client from "../../../lib/db";

export async function GET() {
  try {
    const result = await client.query("SELECT * FROM orders");
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (err) {
    console.error("Error fetching orders:", err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch orders data" }),
      { status: 500 }
    );
  }
}
