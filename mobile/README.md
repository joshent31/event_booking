# JOSH Events mobile

Expo React Native app with native event, package, quote, task, issue-response, payment-record and inbox screens. Administrator cash flow is read-only in the app; full vendor review, pricing, settlement entry and policy controls are on the website.

## Develop

Install the locked dependencies with `npm ci` in this folder, then run `npm start`. Android local builds require the Android SDK; iOS local builds require macOS and Xcode. The Expo `preview` and `production` profiles in eas.json prepare internal and store builds once an Expo account and store credentials are available.

Initial account registration is on the website. In Account, generate a mobile access key, then enter your deployment's HTTPS origin and the key in the app. Never put keys in source, URLs, logs or screenshots. Keys expire after 7 days and are stored in Expo SecureStore. Revoke them on the website if a device is lost. The owner-private hosting gate may block native API requests; the deployment access design must be resolved before external device testing.

## Validation

`npm run export` bundles Android and iOS JavaScript/Hermes output. Successful export is a build check, not a signed installable application or proof of device behavior.

## Before store submission

Create the Google Play and Apple developer accounts, configure EAS ownership, confirm the bundle identifiers, create app icons and screenshots, complete actual-device testing, finalize support/privacy/cancellation and account-deletion handling, then sign and submit. The current app does not collect payments or deliver native push notifications. No store submission or account purchase has been performed.

Relevant implementation references: https://docs.expo.dev/guides/authentication/ and https://docs.expo.dev/versions/latest/sdk/securestore/.
