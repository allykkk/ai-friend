import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { seedToMessages } from '@/lib/seed-to-messages'
import prismaDB from "@/lib/prisma-instance";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

async function saveToDB(chatId, role, userId, content) {
  return prismaDB.character.update({
    where: {
      id: chatId
    },
    data: {
      messages: {
        create: {
          role: role,
          userId: userId,
          content: content,
        },
      },
    }
  });
}

export async function POST(req) {

  // Extract the `messages` from the body of the request
  const { messages, instructions, seed, chatId, userId } = await req.json();

  // Convert instructions and seed into our prompt
  const others = seedToMessages(instructions, seed);

  // Add the instructions to the last 5 messages in the history
  const chatHistory = [...others, ...messages.slice(-5)];

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: chatHistory
  })

  let lastElement = chatHistory.slice(-1)[0];

  // Add the current user's message to the history
  await saveToDB(chatId, "user", userId, lastElement.content);

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response.clone(), {
    onCompletion: async (completion) => {

      // Save the new message to the history
      await saveToDB(chatId, "system", userId, completion.trim());

    },
  });

  // Respond with the stream
  return new StreamingTextResponse(stream);
}