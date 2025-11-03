import { CallDocumentationCard } from '../CallDocumentationCard';

export default function CallDocumentationCardExample() {
  return (
    <div className="w-[600px] space-y-4 p-4">
      <CallDocumentationCard
        agentName="Jessica Martinez"
        timestamp={new Date(Date.now() - 3 * 60 * 60 * 1000)}
        callNotes="Patient called regarding CPAP machine making unusual noise. Discussed troubleshooting steps including checking mask seal and filter replacement."
        resolution="Scheduled technician visit for next Tuesday. Patient will continue using machine until then as noise is minimal."
        agentMessage="Patient was very cooperative and understanding. No immediate safety concerns."
        defaultExpanded={true}
      />
      <CallDocumentationCard
        agentName="David Thompson"
        timestamp={new Date(Date.now() - 24 * 60 * 60 * 1000)}
        callNotes="Follow-up call about prescription authorization. Insurance company approved the claim."
        resolution="Patient notified of approval. Prescription will be ready for pickup tomorrow."
      />
    </div>
  );
}
