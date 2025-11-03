import { Button } from "@/components/ui/button";
import { AlertCircle, Clock, AlertTriangle, CheckCircle2, ListTodo } from "lucide-react";
import type { ConcernStatus } from "./StatusBadge";

interface StatusToggleGroupProps {
  selectedStatus: ConcernStatus;
  onStatusChange: (status: ConcernStatus) => void;
}

const statuses: { value: ConcernStatus; label: string; icon: typeof AlertCircle }[] = [
  { value: "urgent", label: "Urgent", icon: AlertCircle },
  { value: "pending", label: "Pending", icon: Clock },
  { value: "overdue", label: "Overdue", icon: AlertTriangle },
  { value: "tasked", label: "Tasked", icon: ListTodo },
  { value: "done", label: "Done", icon: CheckCircle2 },
];

export function StatusToggleGroup({ selectedStatus, onStatusChange }: StatusToggleGroupProps) {
  return (
    <div className="flex flex-wrap gap-2" data-testid="group-status-toggle">
      {statuses.map(({ value, label, icon: Icon }) => (
        <Button
          key={value}
          variant={selectedStatus === value ? "default" : "outline"}
          size="sm"
          onClick={() => onStatusChange(value)}
          className={`gap-2 ${selectedStatus === value ? "" : ""}`}
          data-testid={`button-status-${value}`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Button>
      ))}
    </div>
  );
}
