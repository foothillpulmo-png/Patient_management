import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { StatusToggleGroup } from "./StatusToggleGroup";
import { CallDocumentationCard } from "./CallDocumentationCard";
import { ChatMessage } from "./ChatMessage";
import { ImageUpload, ImageGallery } from "./ImageUpload";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Plus } from "lucide-react";
import { useState } from "react";
import type { ConcernStatus } from "./StatusBadge";
import type { Image } from "@shared/schema";

interface CallDoc {
  id: string;
  agentName: string;
  timestamp: Date;
  callNotes: string;
  resolution?: string;
  agentMessage?: string;
}

interface ChatMsg {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
  isSelf: boolean;
}

interface ConcernDetailPanelProps {
  concernId: string;
  patientName: string;
  patientDob: string;
  concernCategory: string;
  concernTitle: string;
  status: ConcernStatus;
  onStatusChange: (status: ConcernStatus) => void;
  callDocumentation: CallDoc[];
  chatMessages: ChatMsg[];
  images: Image[];
  onSendMessage?: (message: string) => void;
  onAddCallDoc?: (doc: { callNotes: string; resolution: string; agentMessage: string }) => void;
  onImageUpload?: (image: Image) => void;
  onImageDelete?: (imageId: string) => void;
}

export function ConcernDetailPanel({
  concernId,
  patientName,
  patientDob,
  concernCategory,
  concernTitle,
  status,
  onStatusChange,
  callDocumentation,
  chatMessages,
  images,
  onSendMessage,
  onAddCallDoc,
  onImageUpload,
  onImageDelete,
}: ConcernDetailPanelProps) {
  const [newMessage, setNewMessage] = useState("");
  const [showCallDocForm, setShowCallDocForm] = useState(false);
  const [callNotes, setCallNotes] = useState("");
  const [resolution, setResolution] = useState("");
  const [agentMessage, setAgentMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage?.(newMessage);
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleAddCallDoc = () => {
    if (callNotes.trim()) {
      onAddCallDoc?.({ callNotes, resolution, agentMessage });
      console.log("Adding call documentation:", { callNotes, resolution, agentMessage });
      setCallNotes("");
      setResolution("");
      setAgentMessage("");
      setShowCallDocForm(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-6 space-y-4">
        <div>
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h2 className="text-2xl font-semibold" data-testid="text-patient-name">
                {patientName}
              </h2>
              <p className="text-sm text-muted-foreground">DOB: {patientDob}</p>
            </div>
            <Badge variant="outline">{concernCategory}</Badge>
          </div>
          <h3 className="text-lg text-muted-foreground" data-testid="text-concern-title">
            {concernTitle}
          </h3>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Status</h4>
          <StatusToggleGroup selectedStatus={status} onStatusChange={onStatusChange} />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Call Documentation</h3>
              <Button
                size="sm"
                onClick={() => setShowCallDocForm(!showCallDocForm)}
                data-testid="button-add-call-doc"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Call
              </Button>
            </div>

            {showCallDocForm && (
              <Card className="p-4 mb-4 space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Call Notes</label>
                  <Textarea
                    placeholder="Document the call interaction..."
                    value={callNotes}
                    onChange={(e) => setCallNotes(e.target.value)}
                    className="min-h-32"
                    data-testid="input-call-notes"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Resolution</label>
                  <Textarea
                    placeholder="How was this resolved?"
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    className="min-h-24"
                    data-testid="input-resolution"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Agent Message</label>
                  <Textarea
                    placeholder="Additional notes for team..."
                    value={agentMessage}
                    onChange={(e) => setAgentMessage(e.target.value)}
                    className="min-h-16"
                    data-testid="input-agent-message"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddCallDoc} data-testid="button-submit-call-doc">
                    Save Documentation
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowCallDocForm(false)}
                    data-testid="button-cancel-call-doc"
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            )}

            <div className="space-y-4">
              {callDocumentation.map((doc, idx) => (
                <CallDocumentationCard
                  key={doc.id}
                  agentName={doc.agentName}
                  timestamp={doc.timestamp}
                  callNotes={doc.callNotes}
                  resolution={doc.resolution}
                  agentMessage={doc.agentMessage}
                  defaultExpanded={idx === 0}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Images</h3>
            <div className="space-y-4">
              <ImageUpload 
                concernId={concernId} 
                onUploadComplete={onImageUpload}
              />
              <ImageGallery 
                images={images} 
                onDelete={onImageDelete}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Team Discussion</h3>
            <div className="space-y-4 mb-4">
              {chatMessages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  sender={msg.sender}
                  message={msg.message}
                  timestamp={msg.timestamp}
                  isSelf={msg.isSelf}
                />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Textarea
            placeholder="Type a message to your team..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="resize-none"
            rows={2}
            data-testid="input-chat-message"
          />
          <Button onClick={handleSendMessage} size="icon" data-testid="button-send-message">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
