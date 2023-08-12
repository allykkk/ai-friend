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

export async function POST(req) {

  // Extract the `messages` from the body of the request
  const { messages, instructions, seed, chatId, userId } = await req.json();

  const others = seedToMessages(instructions, seed);
  const chatHistory = [...others, ...messages];

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: chatHistory
  })

  let lastElement = chatHistory.slice(-1)[0];

  console.log(lastElement)

  // Add the current user's message to the history
  await prismaDB.character.update({
    where: {
      id: chatId
    },
    data: {
      messages: {
        create: {
          role: "user",
          userId: userId,
          content: lastElement.content,
        },
      },
    }
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response.clone(), {
    onCompletion: async (completion) => {
      console.log("Response is done??", completion);

      await prismaDB.character.update({
        where: {
          id: chatId
        },
        data: {
          messages: {
            create: {
              content: completion.trim(),
              role: "system",
              userId: userId,
            },
          },
        }
      });



    },
  });

  // Respond with the stream
  return new StreamingTextResponse(stream);
}