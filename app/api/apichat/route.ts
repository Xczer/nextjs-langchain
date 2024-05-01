import { OpenAI } from "@langchain/openai";
import { NextResponse } from "next/server";
import { APIChain } from "langchain/chains";

/* const ORDERS_API_DOCS = `
BASE URL: http://localhost:3000/

API Documentation
The endpoint /api/orders retrieves a list of all orders in JSON format. This list can be filtered by certain criteria to get specific orders. 

JSON Response Structure
The JSON response is an array of objects representing individual orders. Each object contains the following fields:

- order_id: Integer - Unique identifier for the order.
- customer_name: String - Name of the customer who placed the order.
- order_date: String (ISO 8601) - Date when the order was placed.
- order_time: String - Time when the order was placed.
- order_items: String - List of items in the order.
- order_status: String - Current status of the order (e.g., "ready for dispatch", "packaged", "out for delivery", "delivered").
- estimated_delivery: String (ISO 8601) - Estimated delivery date.
- payment_type: String - Payment type (e.g., "Prepaid", "Cash on Delivery").
- coins_used: Boolean - Indicates whether coins were used for payment.
`; */

const ORDERS_API_DOCS = `
BASE URL: http://localhost:3000/

API Documentation
The endpoint /api/orders/{order_id} retrieves the details of a specific order given its order ID.

Endpoint: /api/orders/{order_id}
- Method: GET
- Path Parameter:
  - order_id: Integer - The unique identifier for the order.

JSON Response Structure
The JSON response is an object containing the following fields:

- order_id: Integer - Unique identifier for the order.
- customer_name: String - Name of the customer who placed the order.
- order_date: String (ISO 8601) - Date when the order was placed.
- order_time: String - Time when the order was placed.
- order_items: String - List of items in the order.
- order_status: String - Current status of the order (e.g., "ready for dispatch", "packaged", "out for delivery", "delivered").
- estimated_delivery: String (ISO 8601) - Estimated delivery date.
- payment_type: String - Payment type (e.g., "Prepaid", "Cash on Delivery").
- coins_used: Boolean - Indicates whether coins were used for payment.

Example Request
- GET http://localhost:3000/api/orders/23599046

Example Response
\`
{
  "order_id": 23599046,
  "customer_name": "Priyanka Sharma",
  "order_date": "2024-04-03T18:30:00.000Z",
  "order_time": "04:52:00",
  "order_items": "Deltasone, Cefixime, Imatinib",
  "order_status": "packaged",
  "estimated_delivery": "2024-04-08T18:30:00.000Z",
  "payment_type": "Cash on Delivery",
  "coins_used": false
}
\`
`;
export async function GET() {
  try {
    const model = new OpenAI({ model: "gpt-3.5-turbo-instruct" });
    const chain = APIChain.fromLLMAndAPIDocs(model, ORDERS_API_DOCS, {
      headers: {},
    });

    const res = await chain.invoke({
      question: "What is the customer name of order number 23599047 ?",
    });
    return NextResponse.json({ res }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching order details:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
