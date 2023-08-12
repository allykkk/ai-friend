import prismaDB from "@/lib/prisma-instance";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ChatIdPage = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const character = await prismaDB.character.findUnique({
    where: {
      id: params.chatId,
    },
    include : {
        messages: {
            orderBy: {
                createdAt: "asc",
            },
            where: {
                userId
            }
        }
    }
  });

  if (!character) {
    return redirect("/");
  }

  return <div>Hello {character.name}</div>;
};

export default ChatIdPage;
