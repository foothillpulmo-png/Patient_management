import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";

interface ChatMessageProps {
  sender: string;
  message: string;
  timestamp: Date;
  isSelf?: boolean;
}

export function ChatMessage({ sender, message, timestamp, isSelf = false }: ChatMessageProps) {
  const initials = sender
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`flex gap-2 ${isSelf ? "flex-row-reverse" : ""}`} data-testid="message-chat">
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
      </Avatar>
      <div className={`flex-1 min-w-0 ${isSelf ? "items-end" : ""}`}>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-sm font-medium">{sender}</span>
          <span className="text-xs text-muted-foreground">
            {format(timestamp, "h:mm a")}
          </span>
        </div>
        <div
          className={`text-sm rounded-md p-3 inline-block max-w-full ${
            isSelf ? "bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          {message}
        </div>
      </div>
    </div>
  );
}
