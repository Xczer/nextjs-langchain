import { StreamingTextResponse, LangChainStream, Message } from "ai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { AIMessage, HumanMessage } from "langchain/schema";
import { APIChain } from "langchain/chains";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const { stream, handlers } = LangChainStream();

  const llm = new ChatOpenAI({
    streaming: true,
  });

  const initialPrompt = `Hi there! I'm Bard, your friendly AI customer support assistant. I'm here to help you with any questions you have about your recent orders. Feel free to ask me about order status, tracking information, returns, or anything else related to your purchases. I'll do my best to assist you promptly and efficiently.

  To get started, you can tell me your order number or ask a general question about orders.`;

  llm
    .call(
      (messages as Message[])
        .map(
          (m) =>
            m.role === "user"
              ? [new AIMessage(initialPrompt), new HumanMessage(m.content)]
              : new AIMessage(m.content) // Handle potential AI messages
        )
        .flat(),
      {},
      [handlers]
    )
    .catch(console.error);

  return new StreamingTextResponse(stream);
}
