import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, User } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

interface CallDocumentationCardProps {
  agentName: string;
  timestamp: Date;
  callNotes: string;
  resolution?: string;
  agentMessage?: string;
  defaultExpanded?: boolean;
}

export function CallDocumentationCard({
  agentName,
  timestamp,
  callNotes,
  resolution,
  agentMessage,
  defaultExpanded = false,
}: CallDocumentationCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const initials = agentName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="p-4" data-testid="card-call-documentation">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold" data-testid="text-agent-name">{agentName}</p>
            <p className="text-xs text-muted-foreground">
              {format(timestamp, "MMM d, yyyy 'at' h:mm a")}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          data-testid="button-toggle-expand"
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Call Notes</h4>
            <div className="text-sm prose prose-sm max-w-none">
              <p className="whitespace-pre-wrap">{callNotes}</p>
            </div>
          </div>

          {resolution && (
            <div className="border-l-4 border-l-primary pl-4">
              <h4 className="text-sm font-medium mb-2">Resolution</h4>
              <p className="text-sm whitespace-pre-wrap" data-testid="text-resolution">{resolution}</p>
            </div>
          )}

          {agentMessage && (
            <div className="bg-muted p-4 rounded-md">
              <h4 className="text-sm font-medium mb-2">Agent Message</h4>
              <p className="text-sm whitespace-pre-wrap" data-testid="text-agent-message">{agentMessage}</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
