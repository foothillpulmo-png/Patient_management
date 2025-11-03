import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X, Copy, UserPlus } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface AccessRequest {
  id: string;
  employeeName: string;
  email: string;
  requestDate: Date;
  status: "pending" | "approved" | "denied";
}

interface AccessRequestPanelProps {
  requests: AccessRequest[];
  onApprove?: (id: string) => void;
  onDeny?: (id: string) => void;
  onGenerateToken?: () => string;
}

export function AccessRequestPanel({
  requests,
  onApprove,
  onDeny,
  onGenerateToken,
}: AccessRequestPanelProps) {
  const [generatedToken, setGeneratedToken] = useState("");
  const { toast } = useToast();

  const handleGenerateToken = () => {
    const token = onGenerateToken?.() || `token-${Math.random().toString(36).substr(2, 9)}`;
    setGeneratedToken(token);
    console.log("Generated token:", token);
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(generatedToken);
    toast({
      title: "Token copied",
      description: "Access token has been copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Generate Access Token</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Create a one-time access token for new employees to register for the system.
        </p>
        <div className="flex gap-2">
          <Button onClick={handleGenerateToken} data-testid="button-generate-token">
            <UserPlus className="h-4 w-4 mr-2" />
            Generate Token
          </Button>
        </div>
        {generatedToken && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <div className="flex items-center gap-2">
              <code className="flex-1 font-mono text-sm" data-testid="text-generated-token">
                {generatedToken}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyToken}
                data-testid="button-copy-token"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Access Requests</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id} data-testid={`row-request-${request.id}`}>
                <TableCell className="font-medium">{request.employeeName}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{format(request.requestDate, "MMM d, yyyy")}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      request.status === "approved"
                        ? "default"
                        : request.status === "denied"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {request.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          onApprove?.(request.id);
                          console.log("Approved:", request.id);
                        }}
                        data-testid={`button-approve-${request.id}`}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          onDeny?.(request.id);
                          console.log("Denied:", request.id);
                        }}
                        data-testid={`button-deny-${request.id}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
