import { Client } from "pg";

const client = new Client({
  connectionString: "postgres://default:etWYy5XRf4jD@ep-tiny-silence-a4vcbon9-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error:", err));

export default client;

