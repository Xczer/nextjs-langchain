import { OpenAI } from "@langchain/openai";
import { NextResponse } from "next/server";
import { APIChain } from "langchain/chains";

export async function GET() {
  try {
    let orderId;
    const OrderDetails = `BASE URL: http://localhost:3000/
        API Documentation:
        This API provides details about an order. When Provided with an order ID, it returns the order details.
        If the order ID is not found, it returns an error message.

        GET /api/orders/${orderId}
        Response: {
            "order_id": id of the order (integer eg. 23599046),
            "customer_name": name of the customer (string eg. "John Doe"),
            "order_date": date of the order (string eg. "2024-04-06"),
            "order_time": time of the order (string eg. "18:30:00"),
            "order_items": items in the order (array of strings eg. ["item1", "item2"]),
            "order_status": status of the order (string eg. "Delivered"),
            "estimated_delivery": estimated delivery date (string eg. "2024-04-08"),
            "payment_type": type of payment (string eg. "Credit Card"),
            "coins_used": boolean indicating if coins were used for the order (boolean eg. true),
            }
        
        Request Parameters:
        If the Customer wants to know the status of their order, they must supply the order ID.
      `;
    const model = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "gpt-3.5-turbo-instruct",
      temperature: 0,
    });
    const chain = APIChain.fromLLMAndAPIDocs(model, OrderDetails, {
      headers: {},
    });
    const response = await chain.call({
      question: "What is the Order Status of my order?",
    });
    console.log(response.output);
    return NextResponse.json({ answer: response }, { status: 200 });
  } catch (error) {
    console.log("Error fetching order:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the order." },
      { status: 500 }
    );
  }
}
