"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import { Character } from "@prisma/client";

import ChatMessage from "@/components/chat-window/chat-message";

const ChatMessages = ({ messages = [], isLoading, character }) => {
  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );
  const scrollRef = useRef(null);

  // Loading effect for first time chatting with the character
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // Make sure the page is scrolled to the bottom when new message is added
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      {/* Fake Welcome message  */}
      <ChatMessage
        isLoading={fakeLoading}
        src={character.src}
        role="system"
        content={`Hello, I am ${character.name}, ${character.description}`}
      />

      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          role={message.role}
          src={character.src}
          content={message.content}
        />
      ))}

      {/* While AI is generating messsage  */}
      {isLoading && <ChatMessage src={character.src} role="system" isLoading />}

      <div ref={scrollRef} />
    </div>
  );
};

export default ChatMessages;
