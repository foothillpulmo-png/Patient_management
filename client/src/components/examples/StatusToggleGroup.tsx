import { StatusToggleGroup } from '../StatusToggleGroup';
import { useState } from 'react';
import type { ConcernStatus } from '../StatusBadge';

export default function StatusToggleGroupExample() {
  const [status, setStatus] = useState<ConcernStatus>('pending');

  return (
    <div className="p-4">
      <StatusToggleGroup 
        selectedStatus={status} 
        onStatusChange={(newStatus) => {
          setStatus(newStatus);
          console.log('Status changed to:', newStatus);
        }} 
      />
      <p className="text-sm text-muted-foreground mt-4">Selected: {status}</p>
    </div>
  );
}
