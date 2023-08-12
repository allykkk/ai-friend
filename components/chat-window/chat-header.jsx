import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "../ui/avatar";

export const ChatHeader = ({ character }) => {
  const router = useRouter();

  return (
    <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
      <div className="flex gap-x-2 items-center">
        
        <Button onClick={() => router.back()} size="icon" variant="ghost">
          <ChevronLeft className="h-8 w-8" />
        </Button>
        
        <Avatar className="h-12 w-12">
          <AvatarImage src={character.src} />
        </Avatar>

        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold">{character.name}</p>
          </div>
          {/* it is always created by the current user,isn't it ?  */}
          <p className="text-xs text-muted-foreground">
            Created by {character.userName}
          </p>
        </div>
      </div>
    </div>
  );
};
