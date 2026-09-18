# event_booking
## JOSH Events

Private event-coordination website pilot for Vellore, India, with INR pricing.

### Included workflows
- Customer event requests and service selection.
- Vendor registration records and detailed quotes.
- Coordinator quote comparison and package pricing.
- Coordination checklists and proposed service-issue deductions.
- Authenticated, per-user D1 persistence and responsive layouts.

This is a private single-owner pilot. The role switcher previews workflows; it does not grant separate public customer or vendor accounts. Payment processing, automated settlements, notifications, confirmed bookings and native Android/iOS apps are not implemented. Recorded deductions do not debit anyone.

### Development

Requires Node.js 22.13 or later. Install the locked dependencies with `npm run install:ci`, build with `npm run build`, and start the local development preview with `npm run dev`.

For D1 setup and local migration commands, see [DEVELOPMENT.md](DEVELOPMENT.md). The initial migration is `drizzle/0000_aspiring_changeling.sql`. The `.openai/hosting.json` file identifies the existing private Site and declares the logical `DB` binding; it contains no credentials. GitHub source upload does not deploy the website.

### Checks completed

Production build and TypeScript checks passed. Local API checks covered record persistence, server-side package pricing, ownership validation, unauthenticated access rejection and deduction limits.
