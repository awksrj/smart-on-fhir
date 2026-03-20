# Basic SMART on FHIR JavaScript App

Follows the official tutorial at https://docs.smarthealthit.org/tutorials/javascript/

## How it works (detailed flow)
1. EHR/sandbox opens `launch.html` with URL params (`iss`, `launch`).
2. `launch.html` calls `FHIR.oauth2.authorize()` → redirects to EHR authorization server.
3. User logs in / consents / picks patient.
4. EHR redirects back to `index.html`.
5. `app.js` calls `FHIR.oauth2.ready()` → automatically exchanges code for token.
6. You now have a fully authorized `client` object and can call any FHIR endpoint.

Scopes requested: `launch openid fhirUser patient/*.read`

## Files explained
- launch.html → starts authorization
- index.html → UI shell
- app.js → all FHIR logic
- style.css → simple monospace display

