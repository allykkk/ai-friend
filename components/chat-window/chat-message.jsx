"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BeatLoader } from "react-spinners";
import { Copy } from "lucide-react";
import { useTheme } from "next-themes";

const ChatMessage = ({ role, content, isLoading, src }) => {
  const { toast } = useToast();
  const { theme } = useTheme();

  const onCopy = () => {
    if (!content) return;

    navigator.clipboard.writeText(content);
    toast({
      description: "Message copied to clipboard.",
      duration: 3000,
    });
  };

  let messageClass;
  if (role === "user") {
    messageClass = "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground";
  } else {
    messageClass = "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted";

  }

  return (
    <div
      className={cn(
        "group flex items-start gap-x-3 py-4 w-full",
        role === "user" && "justify-end"
      )}
    >

      <div className={messageClass}>
        {isLoading ? (
          <BeatLoader color={theme === "light" ? "black" : "white"} size={6} />
        ) : (
          <div>
            {content.split("\n").map((i, key) => {
              return (
                <p key={key}>
                  {" "}
                  {i}
                  <br />
                </p>
              );
            })}
          </div>
        )}
      </div>

      {/* Add button to copy AI message  */}
      {role !== "user" && !isLoading && (
        <Button
          onClick={onCopy}
          className="opacity-0 group-hover:opacity-100 transition"
          size="icon"
          variant="ghost"
        >
          <Copy className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default ChatMessage;
