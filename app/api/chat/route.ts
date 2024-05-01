import { StreamingTextResponse, LangChainStream, Message } from "ai";
import { ChatOpenAI } from "@langchain/openai";
import { AIMessage, BaseMessageFields, HumanMessage } from "langchain/schema";
import { APIChain } from "langchain/chains";

export const dynamic = "force-dynamic";

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

export async function POST(req: Request) {
  const { messages } = await req.json();

  const { stream, handlers } = LangChainStream();

  const llm = new ChatOpenAI({
    streaming: true,
  });

  const chain = APIChain.fromLLMAndAPIDocs(llm, ORDERS_API_DOCS, {
    headers: {},
  });

  const initialPrompt = `Hi there! I'm AlmoChat, your friendly AI customer support assistant. I'm here to help you with any questions you have about your recent orders. Feel free to ask me about order status, tracking information, returns, or anything else related to your purchases. I'll do my best to assist you promptly and efficiently.

  To get started, you can tell me your order number or ask a general question about orders. You have to Use Api to get the details of a specific order given its order ID.`;

  let finalMessages = (messages as Message[]).map((m) =>
    m.role === "user"
      ? [new AIMessage(initialPrompt), new HumanMessage(m.content)]
      : new AIMessage(m.content)
  );

  llm.call(finalMessages.flat(), {}, [handlers]);

  return new StreamingTextResponse(stream);
}
