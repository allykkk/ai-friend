import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";

const UserInputBox = ({ input, handleInputChange, handleSubmit }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="border-t py-4 flex items-center gap-x-2"
    >
      <Input
        value={input}
        onChange={handleInputChange}
        placeholder="Type a message"
        className="flex-1 rounded-lg"
      />
      <Button variant="ghost">
        <SendHorizonal className="w-6 h-6" />
      </Button>
    </form>
  );
};

export default UserInputBox;
