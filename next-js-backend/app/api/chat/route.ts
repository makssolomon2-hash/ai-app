import {
  streamText,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return new Response("Missing GOOGLE_GENERATIVE_AI_API_KEY.", { status: 500 });
  }

  const body: { messages?: UIMessage[] } = await req.json();
  if (!Array.isArray(body.messages)) {
    return new Response('Expected "messages" to be an array.', { status: 400 });
  }

  const result = streamText({
    model: google("gemini-3.5-flash-lite"),
    messages: await convertToModelMessages(body.messages),
    maxRetries: 1,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onError: (error) => {
        if (
          error instanceof Error &&
          /high demand|headers timeout|quota|resource_exhausted|429|503/i.test(error.message)
        ) {
          return "Gemini is temporarily busy or rate-limited. Please try again shortly.";
        }
        return "Gemini could not generate a response. Check the API key, quota, and server logs.";
      },
    }),
  });
}