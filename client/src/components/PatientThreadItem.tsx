import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge, type ConcernStatus } from "./StatusBadge";
import { formatDistanceToNow } from "date-fns";

interface PatientThreadItemProps {
  patientName: string;
  patientDob: string;
  latestConcern: string;
  status: ConcernStatus;
  timestamp: Date;
  unreadCount?: number;
  isActive?: boolean;
  onClick?: () => void;
}

export function PatientThreadItem({
  patientName,
  patientDob,
  latestConcern,
  status,
  timestamp,
  unreadCount = 0,
  isActive = false,
  onClick,
}: PatientThreadItemProps) {
  const initials = patientName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`relative flex gap-4 p-4 border-b cursor-pointer hover-elevate active-elevate-2 ${
        isActive ? "bg-sidebar-accent" : ""
      }`}
      onClick={onClick}
      data-testid={`thread-item-${patientName.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarFallback className="text-sm font-medium">{initials}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm truncate" data-testid="text-patient-name">
              {patientName}
            </h3>
            <p className="text-xs text-muted-foreground">DOB: {patientDob}</p>
          </div>
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{latestConcern}</p>

        <div className="flex items-center gap-2">
          <StatusBadge status={status} />
          {unreadCount > 0 && (
            <div className="h-2 w-2 rounded-full bg-primary" data-testid="indicator-unread" />
          )}
        </div>
      </div>
    </div>
  );
}
