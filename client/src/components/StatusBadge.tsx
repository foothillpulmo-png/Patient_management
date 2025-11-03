import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, AlertTriangle, CheckCircle2, ListTodo } from "lucide-react";

export type ConcernStatus = "urgent" | "pending" | "overdue" | "tasked" | "done";

interface StatusBadgeProps {
  status: ConcernStatus;
  onClick?: () => void;
  className?: string;
}

const statusConfig = {
  urgent: {
    label: "Urgent",
    icon: AlertCircle,
    variant: "destructive" as const,
    className: "font-semibold",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    variant: "secondary" as const,
    className: "",
  },
  overdue: {
    label: "Overdue",
    icon: AlertTriangle,
    variant: "destructive" as const,
    className: "italic",
  },
  tasked: {
    label: "Tasked",
    icon: ListTodo,
    variant: "default" as const,
    className: "",
  },
  done: {
    label: "Done",
    icon: CheckCircle2,
    variant: "outline" as const,
    className: "line-through",
  },
};

export function StatusBadge({ status, onClick, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      variant={config.variant}
      className={`gap-1 ${config.className} ${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      data-testid={`badge-status-${status}`}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}
