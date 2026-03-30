# T8: Capture Real Screenshots and Finalize README Proof

## Plan

**Current state:** `docs/screenshots/` exists but is empty. `README.md` already points at `docs/screenshots/status.png`, `timeline.png`, and `rca.png`, but the screenshots do not exist yet and the screenshots intro still reads like reserved placeholder-proof language. The app layout in `src/App.tsx` already exposes the three target views on the main page: status overview/component grid, active incident timeline, and RCA panel.

### Tasks

- [x] 1. Start the Vite app on a fixed local port for capture
- [x] 2. Capture `docs/screenshots/status.png` showing the status landing page with the component grid
- [x] 3. Capture `docs/screenshots/timeline.png` showing the incident timeline view
- [x] 4. Capture `docs/screenshots/rca.png` showing the RCA panel view
- [x] 5. Replace any remaining README screenshot placeholder/proof wording with final evidence language
- [x] 6. Run LSP diagnostics on changed files and run `npm run build` to verify the repo stays clean
- [x] 7. Append a short review summary and notable findings after completion

## Review
- Captured real evidence screenshots in `docs/screenshots/`: `status.png`, `timeline.png`, and `rca.png`.
- Verified the screenshots render the actual app UI and meet the minimum evidence size target (`3200x3600`, `2176x1236`, `2176x1366`).
- Replaced the README screenshots intro with final evidence wording so no placeholder proof language remains.
- Verification passed: LSP diagnostics reported 0 issues for `src` `.ts` and `.tsx` files, and `npm run build` completed successfully.

---

# T11: Add Tests and README Proof to Status/RCA Repo

## Plan

**Current state:** 3 test files (15 tests) covering StatusBadge, ComponentCard, IncidentTimeline — all pass. Untested components: StatusOverview, RCAPanel, IncidentHistory, IncidentSimulator. README cites Cachet as inspiration — should be OpenStatus per source model. Missing required guardrail sections.

### Tasks

- [ ] 1. Add test: StatusOverview — renders "All Systems Operational" / "Degraded Performance", component counts, active incidents
- [ ] 2. Add test: RCAPanel — renders title, expand/collapse toggle reveals RCA fields
- [ ] 3. Add test: IncidentHistory — renders title, filter buttons, incident list, expand/collapse
- [ ] 4. Add test: IncidentSimulator — renders initial status, advance button, reset button, status progression
- [ ] 5. Rewrite README — source inspiration (OpenStatus), support relevance, screenshot placeholders, run commands, updated project structure
- [ ] 6. Run `npm test` — verify all pass
- [ ] 7. Update README test coverage section to reflect new tests

## Review
_(to be filled after completion)_

---

# T6: Cleanup Status/RCA Repo Residue and Reliability Blockers

## Plan

**Current state:** Audit notes confirm three unused starter assets in `src/assets/`, missing `docs/screenshots/`, and README residue: Cachet attribution instead of OpenStatus plus placeholder screenshot copy that still reads like instructions.

### Tasks

- [x] 1. Confirm the blocker notes and current README/assets state for the status/RCA repo
- [x] 2. Remove unused starter assets from `src/assets/`
- [x] 3. Create an empty `docs/screenshots/` directory for later screenshot capture
- [x] 4. Tighten README wording: remove placeholder instructions, improve proof language, and switch source inspiration to `openstatusHQ/openstatus`
- [x] 5. Run `npm test` and `npm run build` to verify the repo stays clean
- [x] 6. Append a short review summary and notable findings after completion

## Review
- Removed unused Vite starter assets: `src/assets/hero.png`, `src/assets/react.svg`, and `src/assets/vite.svg`.
- Created `docs/screenshots/` as the reserved location for later verification captures.
- Updated README screenshot copy to neutral final-quality wording and replaced Cachet attribution with `openstatusHQ/openstatus` in both inspiration sections.
- Verification passed: `npm test` (15/15) and `npm run build` both completed cleanly; LSP diagnostics for `src` reported 0 issues across `.ts` and `.tsx` files.
