"use client";

import { useChat } from "ai/react";

import { ChatHeader } from "./chat-header";
import ChatMessages from "./chat-messages";
import UserInputBox from "./chat-user-input-box";

export const ChatWindow = ({ character, userId }) => {

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
      
      console.log("Got response:", response);
    },
  });

  return (
    <div className="flex flex-col h-screen p-4 space-y-2">
      <ChatHeader character={character} />
      <ChatMessages
        character={character}
        isLoading={false}
        messages={messages}
      />
      <UserInputBox
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
