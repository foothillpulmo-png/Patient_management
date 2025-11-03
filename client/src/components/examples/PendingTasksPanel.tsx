import { PendingTasksPanel } from '../PendingTasksPanel';

export default function PendingTasksPanelExample() {
  const tasks = [
    {
      id: '1',
      patientName: 'Sarah Johnson',
      patientDob: '03/15/1985',
      concernTitle: 'CPAP machine making unusual noise during operation',
      status: 'pending' as const,
      category: 'Machine Issues',
      daysOverdue: 3,
      lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      onClick: () => console.log('Task clicked'),
    },
    {
      id: '2',
      patientName: 'Michael Chen',
      patientDob: '07/22/1978',
      concernTitle: 'Prior authorization pending from insurance company',
      status: 'urgent' as const,
      category: 'Prior Auths',
      daysOverdue: 5,
      lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      onClick: () => console.log('Task clicked'),
    },
    {
      id: '3',
      patientName: 'Emily Rodriguez',
      patientDob: '11/08/1992',
      concernTitle: 'Sleep study results need to be reviewed and discussed',
      status: 'tasked' as const,
      category: 'Sleep Study',
      lastUpdated: new Date(Date.now() - 12 * 60 * 60 * 1000),
      onClick: () => console.log('Task clicked'),
    },
    {
      id: '4',
      patientName: 'James Wilson',
      patientDob: '05/30/1965',
      concernTitle: 'Prescription refill authorization expired',
      status: 'overdue' as const,
      category: 'Prescriptions',
      daysOverdue: 7,
      lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      onClick: () => console.log('Task clicked'),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Pending Tasks</h2>
      <PendingTasksPanel tasks={tasks} />
    </div>
  );
}
