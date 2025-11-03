import { PatientThreadItem } from '../PatientThreadItem';

export default function PatientThreadItemExample() {
  return (
    <div className="w-96 border rounded-md overflow-hidden">
      <PatientThreadItem
        patientName="Sarah Johnson"
        patientDob="03/15/1985"
        latestConcern="Follow-up needed on CPAP machine pressure settings adjustment"
        status="pending"
        timestamp={new Date(Date.now() - 2 * 60 * 60 * 1000)}
        unreadCount={2}
        onClick={() => console.log('Thread clicked')}
      />
      <PatientThreadItem
        patientName="Michael Chen"
        patientDob="07/22/1978"
        latestConcern="Prescription authorization pending from insurance"
        status="urgent"
        timestamp={new Date(Date.now() - 30 * 60 * 1000)}
        isActive={true}
        onClick={() => console.log('Thread clicked')}
      />
      <PatientThreadItem
        patientName="Emily Rodriguez"
        patientDob="11/08/1992"
        latestConcern="Sleep study results ready for review"
        status="done"
        timestamp={new Date(Date.now() - 24 * 60 * 60 * 1000)}
        onClick={() => console.log('Thread clicked')}
      />
    </div>
  );
}
