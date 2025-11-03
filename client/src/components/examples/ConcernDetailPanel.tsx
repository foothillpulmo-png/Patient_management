import { ConcernDetailPanel } from '../ConcernDetailPanel';
import { useState } from 'react';
import type { ConcernStatus } from '../StatusBadge';

export default function ConcernDetailPanelExample() {
  const [status, setStatus] = useState<ConcernStatus>('pending');

  const callDocs = [
    {
      id: '1',
      agentName: 'Jessica Martinez',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      callNotes: 'Patient called regarding CPAP machine making unusual noise. Discussed troubleshooting steps including checking mask seal and filter replacement.',
      resolution: 'Scheduled technician visit for next Tuesday. Patient will continue using machine until then as noise is minimal.',
      agentMessage: 'Patient was very cooperative and understanding. No immediate safety concerns.',
    },
    {
      id: '2',
      agentName: 'David Thompson',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      callNotes: 'Initial inquiry about sleep study results. Patient wanted to know when they would be available.',
      resolution: 'Informed patient results will be ready in 48 hours. Will follow up via phone call.',
    },
  ];

  const chatMessages = [
    {
      id: '1',
      sender: 'David Thompson',
      message: 'Patient seems concerned about the machine noise. Should we expedite the technician visit?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isSelf: false,
    },
    {
      id: '2',
      sender: 'You',
      message: 'I spoke with the patient. They are comfortable waiting until Tuesday. No urgent safety concerns.',
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      isSelf: true,
    },
  ];

  return (
    <div className="h-screen w-full">
      <ConcernDetailPanel
        patientName="Sarah Johnson"
        patientDob="03/15/1985"
        concernCategory="Machine Issues"
        concernTitle="CPAP machine making unusual noise during operation"
        status={status}
        onStatusChange={(newStatus) => {
          setStatus(newStatus);
          console.log('Status changed to:', newStatus);
        }}
        callDocumentation={callDocs}
        chatMessages={chatMessages}
        onSendMessage={(msg) => console.log('Send message:', msg)}
        onAddCallDoc={(doc) => console.log('Add call doc:', doc)}
      />
    </div>
  );
}
