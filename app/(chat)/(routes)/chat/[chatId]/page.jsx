import prismaDB from "@/lib/prisma-instance";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { ChatWindow } from "@/components/chat-window/chat-window";

const ChatIdPage = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

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

  if (!character) {
    return redirect("/");
  }

  return <ChatWindow character={character} userId={userId}  />;
};

export default ChatIdPage;
