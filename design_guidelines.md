# Design Guidelines: Secure Patient Concerns Tracker

## Design Approach

**Selected Approach:** Design System (Hybrid Material Design + Linear-inspired productivity patterns)

**Justification:** This healthcare productivity application is information-dense, requiring exceptional data organization, real-time updates, and professional trust signals. Drawing from Material Design's structured approach combined with Linear's elegant task management interface ensures optimal efficiency for healthcare coordinators managing multiple patient concerns simultaneously.

**Key Design Principles:**
1. Information clarity over decoration
2. Instant status recognition through visual hierarchy
3. Efficient multi-pane navigation for complex workflows
4. Professional, trustworthy aesthetic appropriate for healthcare

---

## Core Design Elements

### A. Typography

**Font System:** Inter (primary), Roboto Mono (data/timestamps)

**Hierarchy:**
- Page Headers: 2xl, semibold (Patient names, section titles)
- Subheaders: xl, medium (Thread categories, concern titles)
- Body Text: base, regular (Documentation, messages)
- Labels/Metadata: sm, medium (Status tags, timestamps, user names)
- Captions: xs, regular (Helper text, secondary info)

**Line Height:** Generous spacing (1.6-1.8) for body text to improve readability during long shifts

---

### B. Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8 (e.g., p-2, gap-4, mb-6, h-8)

**Core Layout Structure:**

**Three-Column Dashboard Layout:**
- Left Sidebar (280px fixed): Navigation, category filters, user profile
- Middle Panel (360-400px): Scrollable list of patient threads/concerns
- Right Panel (flex-1): Detail view with conversation, documentation, actions

**Responsive Behavior:**
- Desktop (lg+): Full three-column layout
- Tablet (md): Two-column (collapsible sidebar, middle + detail panels)
- Mobile: Single column with slide-over panels

**Container Strategy:**
- Full viewport height layouts (h-screen) for application shell
- Scrollable content areas within fixed navigation chrome
- max-w-7xl for centered forms/modals, no max-width for data panels

---

### C. Component Library

#### Navigation Components

**Primary Sidebar:**
- Logo/Brand area at top (h-16)
- Category list with icon + label (12 categories as specified)
- Active state indicator (left border accent)
- Compact spacing (gap-1) for vertical efficiency
- Bottom section: User profile, settings, logout

**Top Bar:**
- Search input (prominent, w-96)
- Real-time notification badge
- Quick filters (Urgent, Overdue, Pending dropdowns)
- Admin controls (access management, visible only to admins)

#### Data Display Components

**Thread List Item (Middle Panel):**
- Patient name (font-semibold, truncate)
- Latest concern preview (2 lines, text-sm, opacity-75)
- Status badge (inline-flex, rounded-full, px-3, py-1)
- Timestamp (text-xs, absolute top-right)
- Unread indicator (h-2 w-2 rounded-full, absolute)
- Subtle dividers between items

**Concern Detail Card (Right Panel):**
- Header: Patient DOB + Full Name, concern category tag
- Status controls: 5 button toggles (Urgent/Pending/Overdue/Tasked/Done)
- Timeline view of all related documentation
- Expandable call documentation entries

**Call Documentation Entry:**
- Timestamp header (text-sm, semibold)
- Agent name badge
- Structured sections:
  - Call notes (prose format, max-w-none)
  - Resolution documentation (bordered section)
  - Agent message field (background-subtle treatment)
- Collapse/expand toggle

**Status Badge System:**
- Urgent: Bold weight, larger padding
- Pending: Default weight
- Overdue: Italic emphasis
- Tasked: Checkmark icon prefix
- Done: Strikethrough text treatment + success icon

#### Form Components

**Call Documentation Form:**
- Large textarea (min-h-32) for notes
- Separate textarea for resolution (min-h-24)
- Agent message field (min-h-16)
- Submit button (w-full, large hit target)
- Auto-save indicator (text-xs, subtle)

**Access Request Interface (Admin View):**
- Table layout with columns: Employee Name, Email, Request Date, Actions
- Approve/Deny button group (inline-flex, gap-2)
- One-time token generation display (monospace font, copy button)

**Side Chat Component:**
- Fixed bottom-right panel (w-80, slide-in animation)
- Message bubbles (rounded-lg, different alignment for sent/received)
- Input at bottom (sticky position)
- Typing indicators (animated dots)
- Participant avatars (h-8 w-8 rounded-full)

#### Reminder & Alert Components

**Pending Task Dashboard:**
- Grid layout (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Card-based design with:
  - Days overdue counter (large, prominent)
  - Patient name + concern summary
  - Quick action buttons
  - Visual urgency indicators (border treatment, not color)

**Reminder Notifications:**
- Toast-style alerts (fixed top-right, w-96)
- Stack vertically with gap-2
- Dismiss button (absolute top-right)
- Click to navigate to concern

---

### D. Interaction Patterns

**Real-time Updates:**
- New messages: Smooth fade-in (opacity 0 to 100)
- Status changes: Pulse effect on badge (scale 1 to 1.05, brief)
- Thread updates: Reorder animation (transform y-axis)

**Navigation:**
- Instant panel switches (no page reloads)
- Breadcrumb trail for deep navigation
- Back button for mobile detail views

**Data Entry:**
- Inline editing for quick updates
- Modal forms for comprehensive documentation
- Auto-complete for patient search
- Keyboard shortcuts (Cmd/Ctrl + K for search)

---

### E. Specialized Features

**Thread Organization Display:**
- Dual view toggle: "By Patient" vs "By Category"
- Patient threads show aggregated concern count badge
- Category threads (12 types) group related concerns
- Cross-referencing indicator when concern appears in multiple threads

**Access Control UI:**
- Admin badge on user profile
- Access request queue (counter in sidebar)
- Token generation modal with copy-to-clipboard
- Employee directory with access status indicators

**Search & Filter Interface:**
- Global search bar with patient name/DOB autocomplete
- Advanced filters: Date range, status, category, assigned agent
- Saved filter presets (Quick access buttons)
- Clear all filters action

---

## Images

This application does not require hero images. It's a data-focused productivity tool where all screen real estate should be dedicated to functional interfaces. The only imagery needed:

- User avatars (circular, 32px-40px throughout, larger in profile areas)
- Empty state illustrations (centered, max-w-md) for:
  - No concerns in thread
  - No search results
  - Access pending approval
  - All tasks completed celebration

Use simple, professional line-art illustrations from libraries like unDraw or similar healthcare-appropriate illustration sets. These should be informative and reassuring, never decorative.