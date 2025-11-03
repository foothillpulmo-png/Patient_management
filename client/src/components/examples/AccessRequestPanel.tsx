import { AccessRequestPanel } from '../AccessRequestPanel';

export default function AccessRequestPanelExample() {
  const requests = [
    {
      id: '1',
      employeeName: 'Jennifer Smith',
      email: 'jennifer.smith@hospital.com',
      requestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'pending' as const,
    },
    {
      id: '2',
      employeeName: 'Robert Davis',
      email: 'robert.davis@hospital.com',
      requestDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: 'approved' as const,
    },
    {
      id: '3',
      employeeName: 'Lisa Anderson',
      email: 'lisa.anderson@hospital.com',
      requestDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'pending' as const,
    },
  ];

  return (
    <div className="p-6 max-w-6xl">
      <h2 className="text-2xl font-semibold mb-6">Access Management</h2>
      <AccessRequestPanel
        requests={requests}
        onApprove={(id) => console.log('Approve:', id)}
        onDeny={(id) => console.log('Deny:', id)}
        onGenerateToken={() => `token-${Math.random().toString(36).substr(2, 12)}`}
      />
    </div>
  );
}
