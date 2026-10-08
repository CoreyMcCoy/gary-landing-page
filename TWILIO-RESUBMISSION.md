# Gary campaign review — October 6, 2026

Campaign: `CMefbcaf4dbce981fcbc598712d06a06df`

## Current status

Resubmitted October 6, 2026, at approximately 10:17 p.m. Central. Twilio's automated recipient-consent verification passed before submission. The console now shows **In review**, and Twilio emailed confirmation that the updated campaign is back in its review queue. Carrier approval is pending.

Verified persisted changes: message flow now includes rate/frequency disclosures, privacy and terms URLs, and START/UNSTOP resubscription; sample #2 includes frequency and rates; sample #3 identifies Gary. The live Messaging Service opt-in confirmation was updated to match sample #2. The registration form's opt-in keywords/confirmation and HELP/STOP replies were populated to match the live service, but the post-submission campaign summary still shows blank opt-in fields and default HELP/STOP replies. Do not claim that summary discrepancy is resolved. The live service itself shows YES/START/UNSTOP and the configured Gary replies.

## Confirmed rejection

The October 6 Twilio email reports error 30909. The reviewer could not open the SMS disclosure URL and saw `ERR_SSL_PROTOCOL_ERROR`. This is the stated rejection; it does not establish approval of the other campaign fields.

## Published website verified

The following URLs returned HTTP 200 over HTTPS and matched their local HTML files exactly after normalizing line endings:

- https://letgarybook.com/sms-disclosure/
- https://letgarybook.com/privacy-policy/
- https://letgarybook.com/terms-and-conditions/

The disclosure and privacy pages now describe the YES requirement. The disclosure shows (254) 400-2952 and links to privacy and terms. Frequency, rates, STOP, HELP, support contact details, and voluntary consent language are present. The privacy page contains the SMS consent data-sharing exclusion. No current SSL failure was reproduced.

## Changes to check in the actual Twilio registration

The original campaign document's message flow does not include privacy/terms links or rate/frequency disclosures in that field. Append the following to the existing message flow, preserving the accurate description of the actual workflow:

> Message frequency varies. Message and data rates may apply. SMS disclosure and opt-in evidence: https://letgarybook.com/sms-disclosure/. Privacy Policy: https://letgarybook.com/privacy-policy/. Terms and Conditions: https://letgarybook.com/terms-and-conditions/. Consent is not required as a condition of purchase.

The original opt-in confirmation omits frequency. Use the following confirmation only after synchronizing the campaign sample, campaign opt-in message, Messaging Service opt-in reply, and application fallback confirmation:

> Thanks, you're signed up for texts from Gary about your call. Message frequency varies. Message and data rates may apply. What's going on? Reply STOP anytime to opt out. Reply HELP for help.

## Consent question that still needs resolution

The original document labels the flow "Verbal consent," but describes a missed call followed by an outbound SMS asking for YES. It describes no spoken consent script or affirmative consent during the call. Twilio's messaging policy requires prior express consent before sending messages; a subsequent YES does not, by itself, document permission for the initial outbound text. Do not claim verbal consent occurred unless the actual call flow collects it.

Inspect the actual registered fields and run Twilio's pre-check before resubmitting. If prior consent is required for this initial text, implement and document an actual consent mechanism (for example, optional phone-keypad consent before an SMS is sent, or an inbound SMS keyword published with disclosures). Do not change only the registration description to claim behavior the app does not perform.

## Application verification

Source code has a `compliance.requireConsentReply` setting, consent timestamp storage, AI/manual reply gating, a one-time reminder, and suppression of a duplicate confirmation when Advanced Opt-Out handles the keyword. The fallback confirmation in `lib/opener.js` was updated locally to include frequency and rates, matching the live Messaging Service. The full 71-test suite, lint, and production build passed. Tests and build needed to run outside the Windows sandbox after filesystem permission errors. The fallback code change has not been deployed. The live Gary business setting has not yet been inspected because the application requires sign-in.

## Account access

The owner signed into Twilio. The actual campaign and Messaging Service were inspected, the automated pre-check passed, and the existing campaign was resubmitted. The console confirms **In review**. No real customer messages, calls, or number purchases were made.

## Official sources

- https://www.twilio.com/docs/api/errors/30909
- https://www.twilio.com/en-us/legal/messaging-policy
