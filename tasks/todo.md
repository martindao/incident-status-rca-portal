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
