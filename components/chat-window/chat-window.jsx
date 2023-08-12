"use client";

import { useChat, useCompletion } from "ai/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { auth } from "@clerk/nextjs";

import { ChatHeader } from "./chat-header";
import ChatMessages from "./chat-messages";

export const ChatWindow = ({ character, userId }) => {
  const router = useRouter();

  console.log(character.messages);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: `/api/chat/${character.id}`,
    body: {
      instructions: character.instructions,
      seed: character.seed,
      chatId: character.id,
      userId: userId,
    },
    initialMessages: character.messages,
    onFinish: async (response) => {
      // OnFinish - We want to save the message to the DB.
      console.log(response);
    },
  });

  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader character={character} />
      <ChatMessages
        character={character}
        isLoading={false}
        messages={messages}
      />

      <form
        onSubmit={handleSubmit}
        className="border-t border-primary/10 py-4 flex items-center gap-x-2"
      >
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message"
          className="flex-1 rounded-lg bg-primary/10"
        />
        <Button variant="ghost">
          <SendHorizonal className="w-6 h-6" />
        </Button>
      </form>
    </div>
  );
};
