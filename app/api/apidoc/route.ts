import { NextResponse } from "next/server";

export async function GET() {
  const openApiDoc = {
    openapi: "3.0.0",
    info: {
      title: "Order API",
      version: "1.0.0",
      description: "API for fetching order information",
    },
    paths: {
      "/api/orders/{orderId}": {
        get: {
          summary: "Retrieve Order Information",
          parameters: [
            {
              name: "orderId",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
              description: "ID of the order to retrieve",
            },
          ],
          responses: {
            "200": {
              description: "Order information",
              content: {
                "application/json": {
                  example: {
                    order_id: 12345678,
                    customer_name: "Jane Doe",
                    order_date: "2023-10-15T18:30:00.000Z",
                    order_time: "14:35:00",
                    order_items: "Item1, Item2",
                    order_status: "shipped",
                    estimated_delivery: "2023-10-20T18:30:00.000Z",
                    payment_type: "Credit Card",
                    coins_used: false,
                  },
                },
              },
            },
            "404": {
              description: "Order not found",
            },
          },
        },
      },
    },
  };
  return NextResponse.json(openApiDoc, { status: 200 });
}
