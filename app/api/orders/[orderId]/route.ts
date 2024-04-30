import client from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;

  if (!orderId) {
    return NextResponse.json(
      { error: "Order ID is required." },
      { status: 400 }
    );
  }

  try {
    const result = await client.query(
      "SELECT * FROM orders WHERE order_id = $1",
      [parseInt(orderId)]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the order." },
      { status: 500 }
    );
  }
}
