# OpenStatus Source Map → incident-status-rca-portal (frontend-only)

## Scope + constraints
- Source reviewed: `https://github.com/openstatusHQ/openstatus` (`apps/status-page`)
- In-scope target: public-facing status + incident/update UX only
- Explicitly out of scope for remake: monitoring engines, alerting pipelines, subscriber backend workflows, auth/session backends, API integrations

## 1) Target screens to mirror (exact OpenStatus references)

### A. Public status home (primary remake target)
- **Source route/file**:  
  `apps/status-page/src/app/(status-page)/[domain]/[locale]/(public)/page.tsx`
- **What it contains**:
  - Status summary header (title + description)
  - Top status banner (overall health)
  - Open-event tabs (incident/report/maintenance) with highlighted active item
  - Component health blocks (single components + grouped components)
  - Uptime bars/tracker per component
  - Recent status feed (reports + maintenance cards)

### B. Events history list (incident/update log)
- **Source route/file**:  
  `apps/status-page/src/app/(status-page)/[domain]/[locale]/(public)/events/(list)/page.tsx`
- **What it contains**:
  - Tab split between **Reports** and **Maintenances**
  - Chronological cards with affected components badges
  - Report timeline updates (Investigating → Identified → Monitoring → Resolved)

### C. Event detail pages (single incident/update view)
- **Source route/files**:
  - `.../events/(view)/report/[id]/page.tsx`
  - `.../events/(view)/maintenance/[id]/page.tsx`
- **What it contains**:
  - Back/link controls
  - Focused timeline for one report or maintenance
  - Affected-component badges
  - Timestamped update thread

### D. Uptime badges endpoint (visual output target)
- **Source route/files**:
  - `.../(public)/badge/route.tsx`
  - `.../(public)/badge/v2/route.ts`
- **What to mirror in UI terms**:
  - Compact badge style and status wording variants
  - Badge color mapping for health state
  - Optional size/outline themes

### E. Monitors overview page (secondary public diagnostic view)
- **Source route/file**:  
  `.../(public)/monitors/page.tsx`
- **What it contains**:
  - List of public monitors
  - Per-monitor mini chart previews
  - Drill-down links to monitor detail

### F. Subscription/status blocks (frontend shell only)
- **Source UI component**:  
  `apps/status-page/src/components/status-page/status-updates.tsx`
- **Related management page (for UX reference only)**:  
  `.../(public)/manage/[token]/page.tsx`
- **What to mirror**:
  - “Get updates” popover and channel tabs (Email/RSS/JSON/SSH/Slack)
  - Copy-link input blocks and success states
  - UI structure only (no real subscribe/unsubscribe backend wiring)

## 2) Public-facing status + incident-update flow (to implement)

1. **User lands on status home**
   - Sees overall status banner + component health summary immediately.

2. **If incident/maintenance/report is open**
   - Banner tab/alert area surfaces active event first.
   - User can open event details from banner card.

3. **User inspects component health**
   - Each component row/card shows status label, uptime %, and recent uptime strip.

4. **User reviews recent updates**
   - Feed shows mixed report + maintenance cards in reverse-chronological order.

5. **User navigates full event history**
   - Events page with Reports/Maintenances tabs.
   - Each item links to dedicated detail page.

6. **User opens detail timeline**
   - Sees sequenced marker updates with timestamps and affected components.

7. **Optional update consumption blocks**
   - User can copy RSS/JSON/SSH/Slack endpoints from frontend-only block.
   - Email form can be mocked/static in this portfolio scope.

## 3) Visual elements to preserve in remake

### Status summary layout
- Large page title + muted description
- Prominent colored health banner with icon + plain-language state
- Last-updated timestamp in mono/small text style

### Component cards / rows
- Name + optional description/tooltip
- Right-aligned status dot/label and uptime percentage
- Micro history bar (daily slices with hover details)
- Footer range cue (historical start → today)

### Incident timeline markers
- Vertical timeline with marker dots and separators
- Update state labels (Investigating/Identified/Monitoring/Resolved)
- Relative + exact timestamp pairing
- Affected component badges under title

### Uptime percentage + history display
- Uptime shown as percentage text in mono style
- Bar/heat strip expressing success/degraded/error/info segments
- Hover card details per day bucket (status mix + related events)

### Color scheme conventions (mirror)
- **Operational / success**: green (`--success`, badge uses `#10b981`)
- **Degraded / warning**: amber (`--warning`, badge uses `#f59e0b`)
- **Down / major outage / error**: red (`--destructive`, badge uses `#ef4444`)
- **Maintenance / info**: blue (`--info`, badge uses `#3b82f6`)
- **Unknown/empty**: muted gray

## 4) Layout rules to carry over

### Page hierarchy
1. Header (title + description)
2. Global status banner
3. Component health section (grid/list)
4. Recent updates feed
5. Link-out to full events history

### Component grid/group behavior
- Mixed support for standalone components and grouped components
- Group title with collapsible content behavior acceptable
- Keep spacing compact and scannable (status-first presentation)

### Timeline structure
- Reverse chronological by default for feeds
- Detail view keeps update sequence explicit with state transitions
- Every update item should support timestamp + message + affected components

### Update-section formatting
- Use card-style containers with subtle borders/background tint
- Separate report vs maintenance by label + icon/status color
- Keep feed row click target large (full-card link behavior)

## 5) Frontend-only translation map for incident-status-rca-portal

### Must build (high priority)
1. Public status homepage shell (banner + component health + recent feed)
2. Incident/report detail timeline page template
3. Events history tab view (Reports / Maintenances)
4. Component health grid with uptime percentages + mini history bars

### Should build (medium priority)
1. Uptime status badge preview block (not server-generated SVG)
2. “Get updates” popover UI with copyable mock links
3. Maintenance-focused card variant in feed/history

### Explicitly skip for this portfolio scope
- Real monitor polling and uptime ingestion
- Real event authoring/workflow backend
- Real email subscription lifecycle + token verification backend
- Real RSS/Atom generation endpoints
