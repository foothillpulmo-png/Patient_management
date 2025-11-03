import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Ticket,
  FileText,
  Wrench,
  Moon,
  ShoppingCart,
  FileCheck,
  Pill,
  FlaskConical,
  DollarSign,
  FolderOpen,
  Users,
  MoreHorizontal,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export type CategoryType =
  | "tickets"
  | "patient-history"
  | "machine-issues"
  | "sleep-study"
  | "checkout"
  | "prior-auths"
  | "prescriptions"
  | "lab-calls"
  | "billings"
  | "medical-records"
  | "tu-pts"
  | "other-concerns";

interface CategorySidebarProps {
  selectedCategory?: CategoryType;
  onCategoryChange?: (category: CategoryType) => void;
  userName?: string;
  userRole?: string;
}

const categories: { value: CategoryType; label: string; icon: typeof Ticket }[] = [
  { value: "tickets", label: "Tickets", icon: Ticket },
  { value: "patient-history", label: "Patient History", icon: FileText },
  { value: "machine-issues", label: "Machine Issues", icon: Wrench },
  { value: "sleep-study", label: "Sleep Study Concerns", icon: Moon },
  { value: "checkout", label: "Check-out", icon: ShoppingCart },
  { value: "prior-auths", label: "Prior Auths", icon: FileCheck },
  { value: "prescriptions", label: "Prescriptions", icon: Pill },
  { value: "lab-calls", label: "Lab Calls for Diagnosis", icon: FlaskConical },
  { value: "billings", label: "Billings", icon: DollarSign },
  { value: "medical-records", label: "Medical Records", icon: FolderOpen },
  { value: "tu-pts", label: "Tu Pts", icon: Users },
  { value: "other-concerns", label: "Other Concerns", icon: MoreHorizontal },
];

export function CategorySidebar({
  selectedCategory,
  onCategoryChange,
  userName = "Admin User",
  userRole = "Administrator",
}: CategorySidebarProps) {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">Patient Tracker</h2>
            <p className="text-xs text-muted-foreground">Healthcare Platform</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.value}>
                  <SidebarMenuButton
                    isActive={selectedCategory === category.value}
                    onClick={() => onCategoryChange?.(category.value)}
                    data-testid={`button-category-${category.value}`}
                  >
                    <category.icon className="h-4 w-4" />
                    <span>{category.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" data-testid="text-user-name">{userName}</p>
            <p className="text-xs text-muted-foreground truncate">{userRole}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="flex-1 gap-2" data-testid="button-settings">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 gap-2" data-testid="button-logout">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
