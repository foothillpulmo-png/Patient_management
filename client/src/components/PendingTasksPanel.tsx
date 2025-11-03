import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge, type ConcernStatus } from "./StatusBadge";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PendingTask {
  id: string;
  patientName: string;
  patientDob: string;
  concernTitle: string;
  status: ConcernStatus;
  category: string;
  daysOverdue?: number;
  lastUpdated: Date;
  onClick?: () => void;
}

interface PendingTasksPanelProps {
  tasks: PendingTask[];
}

export function PendingTasksPanel({ tasks }: PendingTasksPanelProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <Card
          key={task.id}
          className={`p-4 hover-elevate cursor-pointer ${
            task.daysOverdue && task.daysOverdue > 0 ? "border-l-4 border-l-destructive" : ""
          }`}
          onClick={task.onClick}
          data-testid={`card-task-${task.id}`}
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate" data-testid="text-patient-name">
                  {task.patientName}
                </h3>
                <p className="text-xs text-muted-foreground">DOB: {task.patientDob}</p>
              </div>
              {task.daysOverdue !== undefined && task.daysOverdue > 0 && (
                <Badge variant="destructive" className="flex-shrink-0">
                  {task.daysOverdue}d overdue
                </Badge>
              )}
            </div>

            <p className="text-sm line-clamp-2" data-testid="text-concern-title">
              {task.concernTitle}
            </p>

            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                <StatusBadge status={task.status} />
                <Badge variant="outline" className="text-xs">
                  {task.category}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
              <span>Updated {formatDistanceToNow(task.lastUpdated, { addSuffix: true })}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0"
                data-testid="button-view-task"
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
