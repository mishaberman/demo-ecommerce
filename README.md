# demo-ecommerce

## Overview
This variant demonstrates a **basic** implementation of the Meta Pixel with a simulated Conversions API (CAPI) setup. It is part of a collection of demo e-commerce sites that showcase different levels of Meta Pixel and CAPI implementation quality. Each variant is deployed on GitHub Pages.

**Live Site:** https://mishaberman.github.io/demo-ecommerce/
**Quality Grade:** B-

## Meta Pixel Setup

### Base Pixel Code
- **Pixel ID:** `1684145446350033`
- **Location:** The base code is loaded in the `<head>` tag of `index.html`.
- **Noscript Fallback:** A `<noscript>` tag is included to track users with JavaScript disabled.

### Advanced Matching
- **Method:** Basic Advanced Matching is implemented by passing the user's email address directly in the `fbq('init')` call.
- **User Data:** Only the `em` (email) field is passed.
- **Issues:** No `setUserData` call is used, and the email is not hashed, which is a poor practice for privacy.

## Conversions API (CAPI) Setup

### Method
**Console Simulation:** This variant does not have a true Conversions API implementation. Instead, it uses a client-side JavaScript function that simulates CAPI calls by printing the event payload to the browser's developer console (`console.log`). This is a common technique for initial development and debugging but does not send any data to Meta.

### Implementation Details
- **Endpoint:** No actual HTTP requests are made. Events are logged to the console.
- **Access Token:** The access token is not used or exposed because no server-side calls are made.
- **User Data:** No `user_data` is sent via CAPI, as it's a simulation.
- **Hashing:** No PII hashing is performed.
- **Data Processing Options:** `data_processing_options` for CCPA/GDPR are not included.

## Events Tracked

| Event Name         | Pixel | CAPI | Parameters Sent                                                 | event_id |
| ------------------ | ----- | ---- | --------------------------------------------------------------- | -------- |
| ViewContent        | Yes   | Yes  | content_ids, content_type, content_name, value, currency        | No       |
| AddToCart          | Yes   | Yes  | content_ids, content_type, content_name, value, currency, num_items | No       |
| InitiateCheckout   | Yes   | Yes  | content_ids, content_type, content_name, value, currency, num_items | No       |
| Purchase           | Yes   | Yes  | content_ids, content_type, content_name, value, currency, num_items | No       |
| Lead               | Yes   | Yes  | content_name, value, currency                                   | No       |

## Event Deduplication

- **event_id Generation:** No `event_id` is generated in this variant.
- **Deduplication:** Event deduplication is **not implemented**. Since no `event_id` is sent with either Pixel or CAPI events, Meta cannot deduplicate identical events sent from the browser and the server.

## Custom Data

- **Custom Properties:** No `custom_data` fields are sent with any events.
- **Content-Type:** The `content_type` is set to `product`.
- **Content IDs:** The `content_ids` are the product SKU (e.g., `'P12345'`).

## Known Issues

This variant is intentionally designed to demonstrate the following common issues:

- **No Event Deduplication:** The lack of an `event_id` means that if a real CAPI integration were active, all events would be duplicated, leading to inflated performance metrics.
- **CAPI is a Simulation:** The "CAPI" implementation is a fake console log. It prints event data to the browser console but never actually sends it to Meta's servers. This is a common starting point for developers but is not a real CAPI setup.
- **Missing Standard Events:** Key events like `Search`, `CompleteRegistration`, and `Contact` are not tracked.
- **Basic Advanced Matching:** Only the email (`em`) parameter is used in the `fbq('init')` call. No other user data is collected or sent via `setUserData`.

## Security Considerations

- **Access Token:** The Meta Conversions API access token is **not exposed**, as the CAPI implementation is a client-side simulation and does not make real API calls.
- **PII Hashing:** Personally Identifiable Information (PII) is **not hashed**. The email address is passed in plaintext to `fbq('init')`.

---
*This variant is part of the [Meta Pixel Quality Variants](https://github.com/mishaberman) collection for testing and educational purposes.*
