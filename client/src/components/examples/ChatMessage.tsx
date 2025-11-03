import { ChatMessage } from '../ChatMessage';

export default function ChatMessageExample() {
  return (
    <div className="w-[500px] space-y-4 p-4">
      <ChatMessage
        sender="David Thompson"
        message="Patient called back about the authorization. Can someone check the status?"
        timestamp={new Date(Date.now() - 10 * 60 * 1000)}
        isSelf={false}
      />
      <ChatMessage
        sender="You"
        message="I'll check with the insurance company right now and update the thread."
        timestamp={new Date(Date.now() - 5 * 60 * 1000)}
        isSelf={true}
      />
      <ChatMessage
        sender="Jessica Martinez"
        message="Thanks! Let me know if you need the policy number."
        timestamp={new Date()}
        isSelf={false}
      />
    </div>
  );
}
