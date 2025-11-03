import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CategorySidebar, type CategoryType } from "@/components/CategorySidebar";
import { PatientThreadItem } from "@/components/PatientThreadItem";
import { ConcernDetailPanel } from "@/components/ConcernDetailPanel";
import { PendingTasksPanel } from "@/components/PendingTasksPanel";
import { AccessRequestPanel } from "@/components/AccessRequestPanel";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Bell, Settings as SettingsIcon } from "lucide-react";
import type { ConcernStatus } from "@/components/StatusBadge";
import type { Image } from "@shared/schema";

const mockPatients = [
  {
    id: "patient-1",
    concernId: "concern-1",
    name: "Sarah Johnson",
    dob: "03/15/1985",
    concern: "CPAP machine making unusual noise during operation",
    status: "pending" as ConcernStatus,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 2,
  },
  {
    id: "patient-2",
    concernId: "concern-2",
    name: "Michael Chen",
    dob: "07/22/1978",
    concern: "Prior authorization pending from insurance company",
    status: "urgent" as ConcernStatus,
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    unreadCount: 1,
  },
  {
    id: "patient-3",
    concernId: "concern-3",
    name: "Emily Rodriguez",
    dob: "11/08/1992",
    concern: "Sleep study results ready for review",
    status: "done" as ConcernStatus,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: "patient-4",
    concernId: "concern-4",
    name: "James Wilson",
    dob: "05/30/1965",
    concern: "Prescription refill authorization expired",
    status: "overdue" as ConcernStatus,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    unreadCount: 3,
  },
];

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("tickets");
  const [selectedPatient, setSelectedPatient] = useState<string | null>("patient-1");
  const [selectedView, setSelectedView] = useState<"threads" | "pending" | "access">("threads");
  const [concernStatus, setConcernStatus] = useState<ConcernStatus>("pending");
  const [images, setImages] = useState<Image[]>([]);

  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  const mockCallDocs = [
    {
      id: "1",
      agentName: "Jessica Martinez",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      callNotes:
        "Patient called regarding CPAP machine making unusual noise. Discussed troubleshooting steps including checking mask seal and filter replacement.",
      resolution:
        "Scheduled technician visit for next Tuesday. Patient will continue using machine until then as noise is minimal.",
      agentMessage: "Patient was very cooperative and understanding. No immediate safety concerns.",
    },
    {
      id: "2",
      agentName: "David Thompson",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      callNotes:
        "Initial inquiry about sleep study results. Patient wanted to know when they would be available.",
      resolution: "Informed patient results will be ready in 48 hours. Will follow up via phone call.",
    },
  ];

  const mockChatMessages = [
    {
      id: "1",
      sender: "David Thompson",
      message: "Patient seems concerned about the machine noise. Should we expedite the technician visit?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isSelf: false,
    },
    {
      id: "2",
      sender: "You",
      message: "I spoke with the patient. They are comfortable waiting until Tuesday. No urgent safety concerns.",
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      isSelf: true,
    },
  ];

  const mockPendingTasks = [
    {
      id: "1",
      patientName: "Sarah Johnson",
      patientDob: "03/15/1985",
      concernTitle: "CPAP machine making unusual noise during operation",
      status: "pending" as ConcernStatus,
      category: "Machine Issues",
      daysOverdue: 3,
      lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: "2",
      patientName: "Michael Chen",
      patientDob: "07/22/1978",
      concernTitle: "Prior authorization pending from insurance company",
      status: "urgent" as ConcernStatus,
      category: "Prior Auths",
      daysOverdue: 5,
      lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: "3",
      patientName: "Emily Rodriguez",
      patientDob: "11/08/1992",
      concernTitle: "Sleep study results need to be reviewed and discussed",
      status: "tasked" as ConcernStatus,
      category: "Sleep Study",
      lastUpdated: new Date(Date.now() - 12 * 60 * 60 * 1000),
    },
  ];

  const mockAccessRequests = [
    {
      id: "1",
      employeeName: "Jennifer Smith",
      email: "jennifer.smith@hospital.com",
      requestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: "pending" as const,
    },
    {
      id: "2",
      employeeName: "Robert Davis",
      email: "robert.davis@hospital.com",
      requestDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: "approved" as const,
    },
  ];

  const selectedPatientData = mockPatients.find((p) => p.id === selectedPatient);
  const concernId = selectedPatientData?.concernId;

  useEffect(() => {
    const fetchImages = async () => {
      if (concernId) {
        try {
          const response = await fetch(`/api/images/${concernId}`);
          if (response.ok) {
            const data = await response.json();
            setImages(data);
          } else {
            setImages([]);
          }
        } catch (error) {
          console.error("Failed to fetch images:", error);
          setImages([]);
        }
      } else {
        setImages([]);
      }
    };

    fetchImages();
  }, [concernId]);

  const handleImageUpload = (image: Image) => {
    setImages((prev) => [...prev, image]);
  };

  const handleImageDelete = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <CategorySidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          userName="Jessica Martinez"
          userRole="Patient Coordinator"
        />

        <div className="flex flex-col flex-1 min-w-0">
          <header className="flex items-center justify-between gap-4 p-4 border-b">
            <div className="flex items-center gap-2">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <div className="relative w-96 max-w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients by name or DOB..."
                  className="pl-9"
                  data-testid="input-search-patients"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" data-testid="button-notifications">
                <Bell className="h-5 w-5" />
              </Button>
              <ThemeToggle />
            </div>
          </header>

          <Tabs value={selectedView} onValueChange={(v) => setSelectedView(v as any)} className="flex-1 flex flex-col min-h-0">
            <div className="border-b px-4">
              <TabsList>
                <TabsTrigger value="threads" data-testid="tab-threads">
                  Patient Threads
                </TabsTrigger>
                <TabsTrigger value="pending" data-testid="tab-pending">
                  Pending Tasks
                </TabsTrigger>
                <TabsTrigger value="access" data-testid="tab-access">
                  Access Management
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="threads" className="flex-1 flex min-h-0 m-0">
              <div className="w-96 border-r flex flex-col">
                <ScrollArea className="flex-1">
                  {mockPatients.map((patient) => (
                    <PatientThreadItem
                      key={patient.id}
                      patientName={patient.name}
                      patientDob={patient.dob}
                      latestConcern={patient.concern}
                      status={patient.status}
                      timestamp={patient.timestamp}
                      unreadCount={patient.unreadCount}
                      isActive={selectedPatient === patient.id}
                      onClick={() => setSelectedPatient(patient.id)}
                    />
                  ))}
                </ScrollArea>
              </div>

              <div className="flex-1 min-w-0">
                {selectedPatientData && (
                  <ConcernDetailPanel
                    concernId={selectedPatientData.concernId}
                    patientName={selectedPatientData.name}
                    patientDob={selectedPatientData.dob}
                    concernCategory="Machine Issues"
                    concernTitle={selectedPatientData.concern}
                    status={concernStatus}
                    onStatusChange={setConcernStatus}
                    callDocumentation={mockCallDocs}
                    chatMessages={mockChatMessages}
                    images={images}
                    onImageUpload={handleImageUpload}
                    onImageDelete={handleImageDelete}
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="flex-1 overflow-auto m-0 p-6">
              <PendingTasksPanel tasks={mockPendingTasks} />
            </TabsContent>

            <TabsContent value="access" className="flex-1 overflow-auto m-0 p-6">
              <AccessRequestPanel requests={mockAccessRequests} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarProvider>
  );
}
