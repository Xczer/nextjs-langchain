# Project Name

## Setup

1. Copy the `.env.local.example` file and rename it to `.env.local`.

```sh
cp .env.local.example .env.local
```

2. Open the `.env.local` file and replace the placeholders with your actual data. Here's what each variable means:

- `POSTGRES_USER`: Your PostgreSQL username.
- `POSTGRES_PASSWORD`: Your PostgreSQL password.
- `POSTGRES_DB`: The name of your PostgreSQL database.
- `POSTGRES_HOST`: The host of your PostgreSQL server.
- `POSTGRES_PORT`: The port your PostgreSQL server is running on.
- `OPENAI_API_KEY`: Your OpenAI API key.

## API Routes

You can access the following API routes:

- `/api/orders`: Retrieves a list of all orders.
- `/api/orders/[orderId]`: Retrieves the details of a specific order given its order ID.

## Deployment

This project is deployed on Vercel. You can access the live version at [your-vercel-url](your-vercel-url).
