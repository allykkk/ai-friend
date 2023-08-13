import prismaDB from "@/lib/prisma-instance";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { ChatWindow } from "@/components/chat-window/chat-window";

const ChatIdPage = async ({ params }) => {
  const { userId } = auth();

  // If user is not authenticated - redirect them to sign in
  if (!userId) {
    return redirectToSignIn();
  }

  // Find our character, and pass it to the ChatWindow UI component.
  const character = await prismaDB.character.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId,
        },
      },
    },
  });

  // If no character is found, redirect to root.
  if (!character) {
    return redirect("/");
  }

  return <ChatWindow character={character} userId={userId}  />;
};

export default ChatIdPage;
