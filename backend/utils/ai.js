import { OpenRouter } from "@openrouter/sdk";
import "dotenv/config";

const openrouter = new OpenRouter({
  apiKey: process.env.MODEL_API,
});

const streamResponse = async (messages, onChunk) => {
  const stream = await openrouter.chat.send({
    model: "openrouter/free",
    messages,
    stream: true,
    reasoning: { enabled: true },
  });

  let response = "";
  let reasoningDetails = undefined;

  for await (const chunk of stream) {
    const delta = chunk.choices?.[0]?.delta;
    if (!delta) continue;

    const content = delta.content;
    if (content) {
      response += content;
      onChunk(content);
    }

    if (delta.reasoning_details) {
      reasoningDetails = delta.reasoning_details;
    }
    if (chunk.choices?.[0]?.message?.reasoning_details) {
      reasoningDetails = chunk.choices[0].message.reasoning_details;
    }
  }

  return { response, reasoningDetails };
};

export default streamResponse;
