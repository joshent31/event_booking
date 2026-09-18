# JOSH Events

Event coordination for Vellore, India. All financial values are stored as integer paise and displayed as INR.

## Website

- Server-enforced customer, vendor and administrator roles using the supported Sites/ChatGPT sign-in flow.
- Customer requests, vendor approval, availability dates, quotes and package comparison.
- Package publication and explicit customer acceptance, with a snapshot of the published business terms.
- Advance-funded confirmation, vendor date-conflict checks, responsibilities and completion gates.
- Manual customer receipts, refunds, vendor payments and printable transaction records.
- Event cash flow, expected gross margin and outstanding obligations.
- Service issues, vendor responses and reviewed deductions against unpaid balances.
- In-app notifications, support requests, audit history, policy management and account-deletion requests.
- Per-account exports and administrator backup export. Restore preparation is documented below.

The original per-user pilot records remain accessible to the administrator at `/pilot`; they are not automatically converted into shared business bookings.

## Run locally

Use Node 22.13+ and the locked installation with `npm run install:ci`. Configure `.dev.vars` with `JOSH_ADMIN_EMAIL=seedy@sites.test` for the bundled local sign-in identity. Keep `.dev.vars` and `.env` out of Git. For production, set JOSH_ADMIN_EMAIL through the hosting platform to the verified owner's sign-in email; never use the local preview email in production.

Build with `npm run build`; apply each pending SQL migration from `drizzle/` to the local D1 database in filename order, using the commands in DEVELOPMENT.md. Existing applied migrations must not be replayed. Start the preview with `npm run dev`.

Run `node tests/business.test.mjs` for domain checks (Node's built-in SQLite is required) and `node node_modules/typescript/bin/tsc --noEmit` for website type checking.

## Mobile

The `mobile/` directory contains the Expo React Native app for Android and iOS. It uses native controls and the same backend permissions. See mobile/README.md for setup, testing and release limitations.

## Backup and restore

An administrator can use Account → Export business backup. Keep the downloaded file in a protected backup location; it contains customer and vendor information. It excludes mobile access credentials and earlier pilot records. Customer and vendor exports include only the records they can view and are not administrator restore backups.

To prepare a non-destructive restore of missing business records:

```
node scripts/prepare-restore.mjs backup.json restore.sql
```

The script validates the export and generates SQL without applying it. Review it and use the configured D1 tooling to apply it to the same Site identity after the schema migrations. Existing IDs are preserved, so this does not roll existing records back to an earlier state. Test restores in a staging database first. Account identifiers are Site-specific; a different Site needs an explicit account mapping. Automatic backup scheduling and point-in-time recovery are not configured by this source.

## Release status and limits

- Live payment collection, online refunds and payouts are not integrated. Manual records never transfer money. Receipts are not GST tax invoices.
- In-app notifications work; email, SMS, WhatsApp and native push delivery are not connected.
- Business support details and approved policies must be entered before packages can be published. No legal terms have been invented or approved on the owner's behalf.
- Public sign-in currently uses the hosting platform's supported ChatGPT identity, not phone OTP or a separate password system. Hosting audience settings determine who can reach the site.
- Native APIs require a deployment whose access policy permits the request to reach the application. An owner-private hosting gate can block native bearer-token calls; do not weaken access simply to make a test pass.
- Device keys expire after 7 days, are stored hashed on the server, and can be revoked. The app keeps them in SecureStore. Only one key per account is active; initial account setup is on the website.
- Account deletion requests are recorded for administrator handling; they do not immediately erase transaction/audit records.
- Date availability is whole-day, one event per vendor, and does not model multiple crews or time slots.
- The domain currently reads a workspace snapshot per operation and uses a workspace revision to serialize updates. Load testing and narrower queries are needed before high-volume use.
- Android/iOS bundles are not signed APK/AAB/IPA files. Physical-device QA, accessibility QA, store assets, account-deletion policy review, developer accounts, signing and submission remain before app-store release.
- No purchases or paid service accounts were created.
