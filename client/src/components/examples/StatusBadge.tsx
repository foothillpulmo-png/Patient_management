import { StatusBadge } from '../StatusBadge';

export default function StatusBadgeExample() {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      <StatusBadge status="urgent" />
      <StatusBadge status="pending" />
      <StatusBadge status="overdue" />
      <StatusBadge status="tasked" />
      <StatusBadge status="done" />
    </div>
  );
}
