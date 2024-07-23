import { Client } from "pg";

const client = new Client({
  user: process.env.POSTGRES_USER,
  password: String(process.env.POSTGRES_PASSWORD), // Ensure it's explicitly a string
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10), // Ensure port is an integer
  sslmode: String(process.env.SSLMode)
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error:", err));

export default client;
