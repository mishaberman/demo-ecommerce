import { motion } from "framer-motion";
import { ExternalLink, Github, CheckCircle, XCircle, MinusCircle, AlertTriangle, ChevronDown, ChevronUp, Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

/* ============================================================
 * VARIANTS DIRECTORY PAGE
 * Lists all 14 demo-ecommerce versions with full breakdowns
 * of their Meta Pixel and CAPI integration quality.
 * Includes per-pillar CAPI quality ratings.
 * ============================================================ */

type PillarRating = "Excellent" | "Good" | "Fair" | "Poor" | "None";

interface Variant {
  name: string;
  slug: string;
  repo: string;
  liveUrl: string;
  grade: string;
  gradeColor: string;
  capiMethod: string;
  tagline: string;
  description: string;
  pixelSummary: string;
  capiSummary: string;
  keyIssues: string[];
  keyStrengths: string[];
  pillars: {
    eventCoverage: PillarRating;
    emq: PillarRating;
    dedup: PillarRating;
    dataFreshness: PillarRating;
    paramCompleteness: PillarRating;
    privacyDpo: PillarRating;
    implQuality: PillarRating;
  };
  details: {
    pixelBaseCode: "correct" | "partial" | "wrong" | "missing";
    pixelId: "correct" | "wrong" | "placeholder";
    noscriptFallback: boolean;
    advancedMatching: "full" | "partial" | "none" | "unhashed";
    pageViewEvent: boolean;
    viewContentEvent: "correct" | "wrong-name" | "wrong-params" | "trackCustom" | "missing";
    addToCartEvent: "correct" | "trackCustom" | "wrong-name" | "wrong-params" | "missing";
    initiateCheckoutEvent: "correct" | "wrong-params" | "wrong-name" | "trackCustom" | "missing";
    purchaseEvent: "correct" | "trackCustom" | "wrong-name" | "wrong-params" | "missing";
    leadEvent: "correct" | "wrong-name" | "wrong-params" | "missing";
    contactEvent: "correct" | "wrong-name" | "wrong-params" | "missing";
    registrationEvent: "correct" | "trackCustom" | "wrong-name" | "wrong-params" | "missing";
    searchEvent: "correct" | "missing";
    eventId: "all" | "some" | "none";
    setUserData: boolean;
    capiPresent: boolean;
    capiServerSide: boolean;
    capiHashing: "full" | "partial" | "none" | "n/a";
    capiUserData: "complete" | "partial" | "minimal" | "none";
    capiFbcFbp: boolean;
    capiDeduplication: "working" | "broken" | "none";
    capiDataProcessingOptions: boolean;
    duplicateEvents: boolean;
    legacyImgPixel: boolean;
    doubleFbeventsLoad: boolean;
    wrongParamNames: boolean;
    currencyConsistency: boolean;
  };
}

const variants: Variant[] = [
  // ========== ORIGINAL 9 VARIANTS ==========
  {
    name: "Excellent",
    slug: "demo-ecommerce-excellent",
    repo: "https://github.com/mishaberman/demo-ecommerce-excellent",
    liveUrl: "https://mishaberman.github.io/demo-ecommerce-excellent/",
    grade: "A+",
    gradeColor: "bg-emerald-500",
    capiMethod: "Client-Side Simulation",
    tagline: "Near-perfect implementation",
    description: "The gold standard. Full advanced matching (em, ph, fn, ln, external_id), all 8 standard events with complete parameters, event_id on every event for deduplication, properly hashed CAPI with SHA-256, fbc/fbp cookie forwarding, data processing options, and setUserData on all form pages.",
    pixelSummary: "All events use fbq('track') with complete parameters including content_ids, content_name, content_type, value, currency, and num_items. Event IDs attached to every event.",
    capiSummary: "Full CAPI with SHA-256 hashed PII, fbc/fbp cookies, client_user_agent, event_id deduplication, data_processing_options, and proper action_source.",
    keyStrengths: ["All 8 standard events + Search tracked", "Full advanced matching (em, ph, fn, ln, external_id)", "event_id on every event", "SHA-256 hashed PII in CAPI", "fbc/fbp cookie forwarding", "data_processing_options for CCPA", "setUserData on all forms", "noscript fallback"],
    keyIssues: ["CAPI runs client-side (should be server-side)", "Access token exposed in frontend"],
    pillars: { eventCoverage: "Excellent", emq: "Good", dedup: "Good", dataFreshness: "Good", paramCompleteness: "Good", privacyDpo: "Good", implQuality: "Good" },
    details: {
      pixelBaseCode: "correct", pixelId: "correct", noscriptFallback: true, advancedMatching: "full", pageViewEvent: true,
      viewContentEvent: "correct", addToCartEvent: "correct", initiateCheckoutEvent: "correct", purchaseEvent: "correct",
      leadEvent: "correct", contactEvent: "correct", registrationEvent: "correct", searchEvent: "correct",
      eventId: "all", setUserData: true, capiPresent: true, capiServerSide: false, capiHashing: "full",
      capiUserData: "complete", capiFbcFbp: true, capiDeduplication: "working", capiDataProcessingOptions: true,
      duplicateEvents: false, legacyImgPixel: false, doubleFbeventsLoad: false, wrongParamNames: false, currencyConsistency: true,
    },
  },
  {
    name: "Good",
    slug: "demo-ecommerce-good",
    repo: "https://github.com/mishaberman/demo-ecommerce-good",
    liveUrl: "https://mishaberman.github.io/demo-ecommerce-good/",
    grade: "B+",
    gradeColor: "bg-blue-500",
    capiMethod: "Client-Side Simulation",
    tagline: "Solid pixel, basic CAPI with gaps",
    description: "A competent implementation with room for improvement. Advanced matching covers email and phone but misses fn, ln, and external_id. Events have most parameters but some are incomplete. CAPI is present but lacks hashing and has incomplete user_data.",
    pixelSummary: "Standard events use fbq('track') with most required parameters. Some events missing content_name or num_items.",
    capiSummary: "CAPI present but PII sent unhashed. Only fbp cookie forwarded (missing fbc). No data_processing_options.",
    keyStrengths: ["noscript fallback present", "Advanced matching for em and ph", "Most standard events tracked", "event_id on most events", "CAPI endpoint configured"],
    keyIssues: ["Advanced matching missing fn, ln, external_id", "CAPI PII not hashed", "Missing fbc cookie", "No data_processing_options", "Search event missing"],
    pillars: { eventCoverage: "Good", emq: "Fair", dedup: "Fair", dataFreshness: "Fair", paramCompleteness: "Fair", privacyDpo: "Poor", implQuality: "Fair" },
    details: {
      pixelBaseCode: "correct", pixelId: "correct", noscriptFallback: true, advancedMatching: "partial", pageViewEvent: true,
      viewContentEvent: "correct", addToCartEvent: "correct", initiateCheckoutEvent: "correct", purchaseEvent: "correct",
      leadEvent: "correct", contactEvent: "correct", registrationEvent: "correct", searchEvent: "missing",
      eventId: "some", setUserData: false, capiPresent: true, capiServerSide: false, capiHashing: "none",
      capiUserData: "partial", capiFbcFbp: false, capiDeduplication: "working", capiDataProcessingOptions: false,
      duplicateEvents: false, legacyImgPixel: false, doubleFbeventsLoad: false, wrongParamNames: false, currencyConsistency: true,
    },
  },
  {
    name: "Base (Original)",
    slug: "demo-ecommerce",
    repo: "https://github.com/mishaberman/demo-ecommerce",
    liveUrl: "https://mishaberman.github.io/demo-ecommerce/",
    grade: "B",
    gradeColor: "bg-sky-500",
    capiMethod: "Console Simulation",
    tagline: "Functional but many improvement opportunities",
    description: "The original baseline. Pixel fires all standard events but with incomplete parameters. CAPI is simulated client-side with placeholder token. No advanced matching, no event_id, no hashing, no noscript fallback.",
    pixelSummary: "All standard events fire via fbq('track') but many missing content_name, num_items, or content_type. No event_id.",
    capiSummary: "Simulated CAPI — logs to console but doesn't actually send to Graph API. No user_data, no hashing.",
    keyStrengths: ["All 7 standard events tracked", "Correct pixel ID", "Correct event names on correct pages", "value and currency on commerce events"],
    keyIssues: ["No advanced matching", "No noscript fallback", "No event_id", "CAPI is only simulated", "Missing content_name on ViewContent", "No Search event"],
    pillars: { eventCoverage: "Fair", emq: "Poor", dedup: "None", dataFreshness: "Fair", paramCompleteness: "Poor", privacyDpo: "None", implQuality: "Poor" },
    details: {
      pixelBaseCode: "correct", pixelId: "correct", noscriptFallback: false, advancedMatching: "none", pageViewEvent: true,
      viewContentEvent: "wrong-params", addToCartEvent: "correct", initiateCheckoutEvent: "wrong-params", purchaseEvent: "correct",
      leadEvent: "correct", contactEvent: "correct", registrationEvent: "correct", searchEvent: "missing",
      eventId: "none", setUserData: false, capiPresent: true, capiServerSide: false, capiHashing: "none",
      capiUserData: "none", capiFbcFbp: false, capiDeduplication: "none", capiDataProcessingOptions: false,
      duplicateEvents: false, legacyImgPixel: false, doubleFbeventsLoad: false, wrongParamNames: false, currencyConsistency: true,
    },
  },
  {
    name: "Poor",
    slug: "demo-ecommerce-poor",
    repo: "https://github.com/mishaberman/demo-ecommerce-poor",
    liveUrl: "https://mishaberman.github.io/demo-ecommerce-poor/",
    grade: "C",
    gradeColor: "bg-yellow-500",
    capiMethod: "None",
    tagline: "Pixel only, many parameter gaps, no CAPI",
    description: "Pixel-only implementation with significant gaps. No advanced matching, no noscript, and several events have minimal parameters. No CAPI whatsoever.",
    pixelSummary: "Events fire but with minimal parameters. Missing content_name, content_type, num_items on most events.",
    capiSummary: "No CAPI implementation at all.",
    keyStrengths: ["Correct pixel ID", "Standard events use fbq('track')", "PageView fires on load"],
    keyIssues: ["No CAPI at all", "No advanced matching", "No noscript", "Events missing most params", "No event_id", "No Search event"],
    pillars: { eventCoverage: "None", emq: "None", dedup: "None", dataFreshness: "None", paramCompleteness: "None", privacyDpo: "None", implQuality: "None" },
    details: {
      pixelBaseCode: "correct", pixelId: "correct", noscriptFallback: false, advancedMatching: "none", pageViewEvent: true,
      viewContentEvent: "wrong-params", addToCartEvent: "wrong-params", initiateCheckoutEvent: "wrong-params", purchaseEvent: "wrong-params",
      leadEvent: "wrong-params", contactEvent: "correct", registrationEvent: "wrong-params", searchEvent: "missing",
      eventId: "none", setUserData: false, capiPresent: false, capiServerSide: false, capiHashing: "n/a",
      capiUserData: "none", capiFbcFbp: false, capiDeduplication: "none", capiDataProcessingOptions: false,
      duplicateEvents: false, legacyImgPixel: false, doubleFbeventsLoad: false, wrongParamNames: false, currencyConsistency: true,
    },
  },
  {
    name: "Minimal",
    slug: "demo-ecommerce-minimal",
    repo: "https://github.com/mishaberman/demo-ecommerce-minimal",
    liveUrl: "https://mishaberman.github.io/demo-ecommerce-minimal/",
    grade: "D",
    gradeColor: "bg-orange-500",
    capiMethod: "None",
    tagline: "Bare minimum — only 3 events, no CAPI",
    description: "Only PageView, Purchase, and AddToCart fire. All other events are no-ops. Minimal parameters on existing events. No CAPI whatsoever.",
    pixelSummary: "Only 3 of 8+ standard events implemented. Minimal parameters.",
    capiSummary: "No CAPI implementation at all.",
    keyStrengths: ["Correct pixel ID", "PageView fires", "Purchase event exists (minimal)"],
    keyIssues: ["Only 3 events implemented", "Missing ViewContent, InitiateCheckout, Lead, Contact, CompleteRegistration", "No CAPI", "No advanced matching", "No noscript"],
    pillars: { eventCoverage: "None", emq: "None", dedup: "None", dataFreshness: "None", paramCompleteness: "None", privacyDpo: "None", implQuality: "None" },
    details: {
      pixelBaseCode: "correct", pixelId: "correct", noscriptFallback: false, advancedMatching: "none", pageViewEvent: true,
      viewContentEvent: "missing", addToCartEvent: "wrong-params", initiateCheckoutEvent: "missing", purchaseEvent: "wrong-params",
      leadEvent: "missing", contactEvent: "missing", registrationEvent: "missing", searchEvent: "missing",
      eventId: "none", setUserData: false, capiPresent: false, capiServerSide: false, capiHashing: "n/a",
      capiUserData: "none", capiFbcFbp: false, capiDeduplication: "none", capiDataProcessingOptions: false,
      duplicateEvents: false, legacyImgPixel: false, doubleFbeventsLoad: false, wrongParamNames: false, currencyConsistency: true,
    },
  },
  {
    name: "CAPI-Only (Broken Pixel)",
    slug: "demo-ecommerce-capi-only",
    repo: "https://github.com/mishaberman/demo-ecommerce-capi-only",
    liveUrl: "https://mishaberman.github.io/demo-ecommerce-capi-only/",
    grade: "D-",
    gradeColor: "bg-orange-600",
    capiMethod: "Client-Side Simulation",
    tagline: "Strong CAPI but broken pixel (wrong ID, unhashed PII)",
    description: "Paradoxical setup: CAPI is excellent (hashing, event_id, fbc/fbp, DPO) but pixel uses WRONG pixel ID. Advanced matching passes raw unhashed PII. Dedup broken due to pixel ID mismatch.",
    pixelSummary: "Pixel fires all events with event_id, BUT uses wrong pixel ID (extra digit). Advanced matching passes raw unhashed PII.",
    capiSummary: "Excellent CAPI: correct pixel ID, SHA-256 hashing, fbc/fbp, event_id, DPO. But dedup broken due to pixel ID mismatch.",
    keyStrengths: ["CAPI has proper SHA-256 hashing", "CAPI uses correct pixel ID", "event_id on all events", "fbc/fbp in CAPI", "data_processing_options present"],
    keyIssues: ["PIXEL uses WRONG pixel ID", "Advanced matching passes RAW unhashed PII", "Dedup broken — pixel/CAPI use different IDs", "CAPI still client-side"],
    pillars: { eventCoverage: "Good", emq: "Poor", dedup: "None", dataFreshness: "Fair", paramCompleteness: "Fair", privacyDpo: "None", implQuality: "Poor" },
    details: {
      pixelBaseCode: "correct", pixelId: "wrong", noscriptFallback: true, advancedMatching: "unhashed", pageViewEvent: true,
      viewContentEvent: "correct", addToCartEvent: "correct", initiateCheckoutEvent: "correct", purchaseEvent: "correct",
      leadEvent: "correct", contactEvent: "correct", registrationEvent: "correct", searchEvent: "correct",
      eventId: "all", setUserData: true, capiPresent: true, capiServerSide: false, capiHashing: "full",
      capiUserData: "complete", capiFbcFbp: true, capiDeduplication: "broken", capiDataProcessingOptions: true,
      duplicateEvents: false, legacyImgPixel: false, doubleFbeventsLoad: false, wrongParamNames: false, currencyConsistency: true,
    },
  },
  {
    name: "Duplicate Events",
    slug: "demo-ecommerce-duplicate",
    repo: "https://github.com/mishaberman/demo-ecommerce-duplicate",
    liveUrl: "https://mishaberman.github.io/demo-ecommerce-duplicate/",
    grade: "D",
    gradeColor: "bg-orange-500",
    capiMethod: "Client-Side Simulation",
    tagline: "Every event fires twice — no deduplication",
    description: "Every event fires TWICE — once immediately and once via setTimeout. CAPI also sends each event twice. No event_id, making dedup impossible. Inflates all conversion counts by 2x.",
    pixelSummary: "All events fire twice via fbq('track'). No event_id. Correct pixel ID and decent parameters.",
    capiSummary: "CAPI present but each event sent twice with no event_id. Incomplete user_data.",
    keyStrengths: ["Correct pixel ID", "All standard events tracked", "Parameters mostly complete", "noscript fallback"],
    keyIssues: ["EVERY event fires TWICE (2x inflation)", "No event_id — dedup impossible", "CAPI duplicates every event", "setUserData is a no-op", "No PII hashing"],
    pillars: { eventCoverage: "Good", emq: "Fair", dedup: "None", dataFreshness: "Fair", paramCompleteness: "Fair", privacyDpo: "None", implQuality: "Poor" },
    details: {
      pixelBaseCode: "correct", pixelId: "correct", noscriptFallback: true, advancedMatching: "partial", pageViewEvent: true,
      viewContentEvent: "correct", addToCartEvent: "correct", initiateCheckoutEvent: "correct", purchaseEvent: "correct",
      leadEvent: "correct", contactEvent: "correct", registrationEvent: "correct", searchEvent: "missing",
      eventId: "none", setUserData: false, capiPresent: true, capiServerSide: false, capiHashing: "none",
      capiUserData: "minimal", capiFbcFbp: false, capiDeduplication: "none", capiDataProcessingOptions: false,
      duplicateEvents: true, legacyImgPixel: false, doubleFbeventsLoad: false, wrongParamNames: false, currencyConsistency: true,
    },
  },
  {
    name: "Wrong Events",
    slug: "demo-ecommerce-wrong-events",
    repo: "https://github.com/mishaberman/demo-ecommerce-wrong-events",
    liveUrl: "https://mishaberman.github.io/demo-ecommerce-wrong-events/",
    grade: "F",
    gradeColor: "bg-red-500",
    capiMethod: "Client-Side Simulation",
    tagline: "Correct structure but wrong event names on wrong pages",
    description: "Structurally looks correct but event names are SWAPPED: product pages fire AddToCart, cart fires ViewContent, checkout fires Lead, contact fires CompleteRegistration, lead form fires Purchase (inflating revenue!). Currency inconsistent.",
    pixelSummary: "Events fire with event_id and parameters, but names are WRONG for each page context.",
    capiSummary: "CAPI mirrors the wrong events consistently. Has event_id but incomplete user_data.",
    keyStrengths: ["Pixel and CAPI both fire", "event_id present on all events", "Parameters structurally valid", "noscript fallback"],
    keyIssues: ["ViewContent fires 'AddToCart'", "AddToCart fires 'ViewContent'", "Purchase fires 'Lead'", "Lead fires 'Purchase' (inflates revenue!)", "Contact fires 'CompleteRegistration'", "Currency inconsistency (EUR/USD)"],
    pillars: { eventCoverage: "Poor", emq: "Poor", dedup: "None", dataFreshness: "Fair", paramCompleteness: "Poor", privacyDpo: "None", implQuality: "Poor" },
    details: {
      pixelBaseCode: "correct", pixelId: "correct", noscriptFallback: true, advancedMatching: "partial", pageViewEvent: true,
      viewContentEvent: "wrong-name", addToCartEvent: "wrong-name", initiateCheckoutEvent: "correct", purchaseEvent: "wrong-name",
      leadEvent: "wrong-name", contactEvent: "wrong-name", registrationEvent: "wrong-name", searchEvent: "missing",
      eventId: "all", setUserData: false, capiPresent: true, capiServerSide: false, capiHashing: "none",
      capiUserData: "partial", capiFbcFbp: false, capiDeduplication: "working", capiDataProcessingOptions: true,
      duplicateEvents: false, legacyImgPixel: false, doubleFbeventsLoad: false, wrongParamNames: false, currencyConsistency: false,
    },
  },
  {
    name: "Legacy/Outdated",
    slug: "demo-ecommerce-legacy",
    repo: "https://github.com/mishaberman/demo-ecommerce-legacy",
    liveUrl: "https://mishaberman.github.io/demo-ecommerce-legacy/",
    grade: "F-",
    gradeColor: "bg-red-700",
    capiMethod: "None",
    tagline: "Deprecated patterns, trackCustom, wrong params, no CAPI",
    description: "Everything is wrong in a legacy way. fbevents.js loaded TWICE. Uses deprecated setUserProperties. Standard events sent via trackCustom — Meta won't optimize. Wrong parameter names. Legacy img-tag pixel creates duplicates. No CAPI.",
    pixelSummary: "Mix of fbq('track') and fbq('trackCustom'). trackCustom used for AddToCart, Purchase, CompleteRegistration — won't optimize.",
    capiSummary: "No CAPI implementation whatsoever.",
    keyStrengths: ["Correct pixel ID", "PageView fires (though potentially duplicated)"],
    keyIssues: ["fbevents.js loaded TWICE", "Deprecated setUserProperties", "trackCustom for standard events", "Wrong parameter names", "Legacy img-tag pixel", "No CAPI", "No event_id"],
    pillars: { eventCoverage: "Fair", emq: "Poor", dedup: "None", dataFreshness: "Fair", paramCompleteness: "Poor", privacyDpo: "None", implQuality: "Poor" },
    details: {
      pixelBaseCode: "wrong", pixelId: "correct", noscriptFallback: true, advancedMatching: "none", pageViewEvent: true,
      viewContentEvent: "wrong-params", addToCartEvent: "trackCustom", initiateCheckoutEvent: "wrong-params", purchaseEvent: "trackCustom",
      leadEvent: "wrong-params", contactEvent: "correct", registrationEvent: "trackCustom", searchEvent: "missing",
      eventId: "none", setUserData: false, capiPresent: false, capiServerSide: false, capiHashing: "n/a",
      capiUserData: "none", capiFbcFbp: false, capiDeduplication: "none", capiDataProcessingOptions: false,
      duplicateEvents: true, legacyImgPixel: true, doubleFbeventsLoad: true, wrongParamNames: true, currencyConsistency: false,
    },
  },

  // ========== 5 NEW CAPI-METHOD VARIANTS ==========
  {
    name: "CAPI: Direct HTTP",
    slug: "demo-ecommerce-capi-http",
    repo: "https://github.com/mishaberman/demo-ecommerce-capi-http",
    liveUrl: "https://mishaberman.github.io/demo-ecommerce-capi-http/",
    grade: "B",
    gradeColor: "bg-sky-500",
    capiMethod: "Direct HTTP POST (fetch)",
    tagline: "High coverage + freshness, low EMQ + no privacy",
    description: "Uses raw fetch() POST directly to Meta Graph API. All 8 events sent server-side with event_id for dedup. However, hashing doesn't normalize before SHA-256, fbc/fbp cookies are NOT forwarded, and there are no data_processing_options. Access token is exposed client-side.",
    pixelSummary: "All events fire with event_id and complete parameters. Good pixel base code with advanced matching (em, ph).",
    capiSummary: "Direct HTTP POST to Graph API. Hashes PII but without normalization. Missing fbc/fbp, no DPO, access token exposed client-side, no retry logic.",
    keyStrengths: ["All 8 events + Search sent via CAPI", "event_id on all events for dedup", "SHA-256 hashing (though unnormalized)", "Real-time sending", "Complete custom_data params"],
    keyIssues: ["Access token EXPOSED client-side", "Hashing without normalization (no lowercase/trim)", "Missing fbc/fbp cookies", "No data_processing_options", "No retry logic or batching", "event_time uses client clock"],
    pillars: { eventCoverage: "Excellent", emq: "Poor", dedup: "Good", dataFreshness: "Excellent", paramCompleteness: "Fair", privacyDpo: "None", implQuality: "Fair" },
    details: {
      pixelBaseCode: "correct", pixelId: "correct", noscriptFallback: true, advancedMatching: "partial", pageViewEvent: true,
      viewContentEvent: "correct", addToCartEvent: "correct", initiateCheckoutEvent: "correct", purchaseEvent: "correct",
      leadEvent: "correct", contactEvent: "correct", registrationEvent: "correct", searchEvent: "correct",
      eventId: "all", setUserData: true, capiPresent: true, capiServerSide: false, capiHashing: "partial",
      capiUserData: "complete", capiFbcFbp: false, capiDeduplication: "working", capiDataProcessingOptions: false,
      duplicateEvents: false, legacyImgPixel: false, doubleFbeventsLoad: false, wrongParamNames: false, currencyConsistency: true,
    },
  },
  {
    name: "CAPI: Business SDK",
    slug: "demo-ecommerce-capi-sdk",
    repo: "https://github.com/mishaberman/demo-ecommerce-capi-sdk",
    liveUrl: "https://mishaberman.github.io/demo-ecommerce-capi-sdk/",
    grade: "B+",
    gradeColor: "bg-blue-500",
    capiMethod: "Meta Business SDK (class-based)",
    tagline: "Good EMQ + structured code, but NO deduplication",
    description: "Simulates Meta Business SDK patterns with UserData, CustomData, ServerEvent, and EventRequest classes. Proper SHA-256 normalization and hashing. Reads fbc/fbp cookies. Rich user_data. BUT: no event_id anywhere — dedup is impossible. Search is pixel-only. data_processing_options present but empty array.",
    pixelSummary: "All events fire via fbq('track') with good parameters. No eventID passed to pixel events.",
    capiSummary: "SDK-style class construction with proper hashing and normalization. Rich user_data (em, ph, fn, ln, ct, st, zp). But NO event_id = no dedup. Search is pixel-only.",
    keyStrengths: ["Proper SHA-256 with normalization (lowercase, trim)", "Rich user_data (7 fields)", "fbc/fbp cookie forwarding", "Structured SDK-style code", "client_user_agent included"],
    keyIssues: ["NO event_id on ANY event — dedup impossible", "Search event is pixel-only (no CAPI)", "data_processing_options is empty array", "No external_id", "CAPI still client-side"],
    pillars: { eventCoverage: "Good", emq: "Good", dedup: "None", dataFreshness: "Good", paramCompleteness: "Good", privacyDpo: "Fair", implQuality: "Good" },
    details: {
      pixelBaseCode: "correct", pixelId: "correct", noscriptFallback: true, advancedMatching: "partial", pageViewEvent: true,
      viewContentEvent: "correct", addToCartEvent: "correct", initiateCheckoutEvent: "correct", purchaseEvent: "correct",
      leadEvent: "correct", contactEvent: "correct", registrationEvent: "correct", searchEvent: "correct",
      eventId: "none", setUserData: true, capiPresent: true, capiServerSide: false, capiHashing: "full",
      capiUserData: "complete", capiFbcFbp: true, capiDeduplication: "none", capiDataProcessingOptions: false,
      duplicateEvents: false, legacyImgPixel: false, doubleFbeventsLoad: false, wrongParamNames: false, currencyConsistency: true,
    },
  },
  {
    name: "CAPI: Param Builder",
    slug: "demo-ecommerce-capi-parambuilder",
    repo: "https://github.com/mishaberman/demo-ecommerce-capi-parambuilder",
    liveUrl: "https://mishaberman.github.io/demo-ecommerce-capi-parambuilder/",
    grade: "A",
    gradeColor: "bg-emerald-400",
    capiMethod: "Parameter Builder Library",
    tagline: "Excellent EMQ/dedup/privacy, but only 4 events covered server-side",
    description: "The highest quality CAPI code — auto fbc/fbp management, proper hashing with normalization, external_id, retry logic, data_processing_options with opt_out. BUT only ViewContent, AddToCart, and Purchase are sent via CAPI. InitiateCheckout, Lead, Contact, CompleteRegistration, and Search are pixel-only with logged warnings.",
    pixelSummary: "All events fire with eventID. Excellent parameters on all events.",
    capiSummary: "Parameter Builder style with auto fbc/fbp, retry logic, full hashing, external_id, DPO. But only 3 commerce events + PageView sent server-side. 5 events are pixel-only.",
    keyStrengths: ["Auto fbc/fbp cookie management", "SHA-256 with full normalization", "external_id for cross-device", "Retry logic with exponential backoff", "data_processing_options + opt_out", "event_id on all events", "API v21.0"],
    keyIssues: ["Only 3 events sent via CAPI (ViewContent, AddToCart, Purchase)", "InitiateCheckout, Lead, Contact, Registration, Search are pixel-only", "Partial event coverage undermines CAPI value", "CAPI still client-side"],
    pillars: { eventCoverage: "Fair", emq: "Excellent", dedup: "Excellent", dataFreshness: "Excellent", paramCompleteness: "Excellent", privacyDpo: "Excellent", implQuality: "Excellent" },
    details: {
      pixelBaseCode: "correct", pixelId: "correct", noscriptFallback: true, advancedMatching: "full", pageViewEvent: true,
      viewContentEvent: "correct", addToCartEvent: "correct", initiateCheckoutEvent: "correct", purchaseEvent: "correct",
      leadEvent: "correct", contactEvent: "correct", registrationEvent: "correct", searchEvent: "correct",
      eventId: "all", setUserData: true, capiPresent: true, capiServerSide: false, capiHashing: "full",
      capiUserData: "complete", capiFbcFbp: true, capiDeduplication: "working", capiDataProcessingOptions: true,
      duplicateEvents: false, legacyImgPixel: false, doubleFbeventsLoad: false, wrongParamNames: false, currencyConsistency: true,
    },
  },
  {
    name: "CAPI: Gateway Proxy",
    slug: "demo-ecommerce-capi-gateway",
    repo: "https://github.com/mishaberman/demo-ecommerce-capi-gateway",
    liveUrl: "https://mishaberman.github.io/demo-ecommerce-capi-gateway/",
    grade: "B-",
    gradeColor: "bg-sky-400",
    capiMethod: "CAPI Gateway (proxy endpoint)",
    tagline: "Good coverage/dedup but poor EMQ, sparse params, no privacy",
    description: "Routes events through a gateway proxy URL. All 8 events sent with event_id for dedup. BUT: only sends em and ph to gateway (fn/ln/ct/st/zp stored but never sent!). PII sent UNHASHED relying on gateway to hash. CAPI custom_data is sparse — missing content_name, num_items on most events. No data_processing_options.",
    pixelSummary: "All events fire with event_id and complete parameters. Good pixel implementation.",
    capiSummary: "Gateway proxy style. All events sent but only em/ph in user_data (fn/ln/ct/st/zp ignored). PII sent unhashed. Sparse custom_data. No DPO. No retry logic.",
    keyStrengths: ["All 8 events sent to gateway", "event_id on all events", "fbc/fbp cookies forwarded", "Real-time sending", "Gateway handles auth"],
    keyIssues: ["Only em/ph sent — fn/ln/ct/st/zp stored but NEVER included", "PII sent UNHASHED to gateway (security risk)", "Sparse custom_data (missing content_name, num_items)", "No data_processing_options", "No retry logic — events lost if gateway down", "Gateway URL is placeholder"],
    pillars: { eventCoverage: "Excellent", emq: "Poor", dedup: "Good", dataFreshness: "Excellent", paramCompleteness: "Poor", privacyDpo: "None", implQuality: "Fair" },
    details: {
      pixelBaseCode: "correct", pixelId: "correct", noscriptFallback: true, advancedMatching: "partial", pageViewEvent: true,
      viewContentEvent: "correct", addToCartEvent: "correct", initiateCheckoutEvent: "correct", purchaseEvent: "correct",
      leadEvent: "correct", contactEvent: "correct", registrationEvent: "correct", searchEvent: "correct",
      eventId: "all", setUserData: true, capiPresent: true, capiServerSide: false, capiHashing: "none",
      capiUserData: "partial", capiFbcFbp: true, capiDeduplication: "working", capiDataProcessingOptions: false,
      duplicateEvents: false, legacyImgPixel: false, doubleFbeventsLoad: false, wrongParamNames: false, currencyConsistency: true,
    },
  },
  {
    name: "CAPI: GTM Server-Side",
    slug: "demo-ecommerce-capi-gtm",
    repo: "https://github.com/mishaberman/demo-ecommerce-capi-gtm",
    liveUrl: "https://mishaberman.github.io/demo-ecommerce-capi-gtm/",
    grade: "B-",
    gradeColor: "bg-sky-400",
    capiMethod: "GTM Server-Side (dataLayer)",
    tagline: "Excellent coverage but GA4 name mismatch, poor EMQ, no privacy",
    description: "Uses dataLayer.push() with GA4 event names (view_item, add_to_cart) instead of Meta names (ViewContent, AddToCart). sGTM tag must map correctly or dedup fails. Only email/phone pushed to dataLayer — fn/ln/ct/st/zp stored but NEVER sent. No consent_state, no data_processing_options. Uses sendBeacon for reliability.",
    pixelSummary: "All events fire with event_id and complete parameters using Meta event names.",
    capiSummary: "dataLayer push with GA4 names (view_item not ViewContent). Only em/ph in user_data. No DPO. sendBeacon backup to sGTM. Dedup at risk from name mismatch.",
    keyStrengths: ["All 8 events pushed to dataLayer", "event_id on all events", "sendBeacon for page-unload reliability", "fbc/fbp cookies forwarded", "Real-time via dataLayer"],
    keyIssues: ["GA4 event names (view_item) vs Meta names (ViewContent) — dedup risk", "Only em/ph in user_data — fn/ln/ct/st/zp NEVER sent", "No data_processing_options", "No consent_state for GTM consent mode", "search_term vs search_string param mismatch", "sGTM container URL is placeholder"],
    pillars: { eventCoverage: "Excellent", emq: "Poor", dedup: "Fair", dataFreshness: "Excellent", paramCompleteness: "Fair", privacyDpo: "None", implQuality: "Fair" },
    details: {
      pixelBaseCode: "correct", pixelId: "correct", noscriptFallback: true, advancedMatching: "partial", pageViewEvent: true,
      viewContentEvent: "correct", addToCartEvent: "correct", initiateCheckoutEvent: "correct", purchaseEvent: "correct",
      leadEvent: "correct", contactEvent: "correct", registrationEvent: "correct", searchEvent: "correct",
      eventId: "all", setUserData: true, capiPresent: true, capiServerSide: false, capiHashing: "none",
      capiUserData: "partial", capiFbcFbp: true, capiDeduplication: "working", capiDataProcessingOptions: false,
      duplicateEvents: false, legacyImgPixel: false, doubleFbeventsLoad: false, wrongParamNames: false, currencyConsistency: true,
    },
  },
];

// ============================================================
// PILLAR RATING COMPONENTS
// ============================================================

const pillarColors: Record<PillarRating, string> = {
  Excellent: "bg-emerald-500 text-white",
  Good: "bg-blue-500 text-white",
  Fair: "bg-yellow-500 text-white",
  Poor: "bg-orange-500 text-white",
  None: "bg-red-500/80 text-white",
};

function PillarBadge({ rating }: { rating: PillarRating }) {
  return (
    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${pillarColors[rating]}`}>
      {rating}
    </span>
  );
}

function StatusIcon({ status }: { status: boolean | string }) {
  if (status === true || status === "correct" || status === "full" || status === "all" || status === "working" || status === "complete") {
    return <CheckCircle className="w-4 h-4 text-emerald-500 inline" />;
  }
  if (status === "partial" || status === "some" || status === "broken") {
    return <MinusCircle className="w-4 h-4 text-yellow-500 inline" />;
  }
  if (status === "unhashed" || status === "trackCustom" || status === "wrong-name" || status === "wrong-params" || status === "wrong") {
    return <AlertTriangle className="w-4 h-4 text-orange-500 inline" />;
  }
  return <XCircle className="w-4 h-4 text-red-400 inline" />;
}

function StatusLabel({ status }: { status: boolean | string }) {
  if (typeof status === "boolean") return <span>{status ? "Yes" : "No"}</span>;
  const labels: Record<string, string> = {
    correct: "Correct", partial: "Partial", full: "Full", none: "None",
    wrong: "Wrong", missing: "Missing", "wrong-name": "Wrong Name",
    "wrong-params": "Wrong Params", trackCustom: "trackCustom (broken)",
    all: "All Events", some: "Some Events", working: "Working",
    broken: "Broken", complete: "Complete", minimal: "Minimal",
    unhashed: "Unhashed PII!", "n/a": "N/A", placeholder: "Placeholder",
  };
  return <span>{labels[status] || status}</span>;
}

// ============================================================
// VARIANT CARD
// ============================================================

function VariantCard({ variant, index }: { variant: Variant; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="border border-border rounded-sm overflow-hidden bg-card"
    >
      <div className="p-5 flex items-start gap-4">
        <div className={`${variant.gradeColor} text-white font-bold text-lg w-12 h-12 rounded-sm flex items-center justify-center shrink-0 font-[family-name:var(--font-display)]`}>
          {variant.grade}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold font-[family-name:var(--font-display)]">{variant.name}</h3>
            <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground font-mono">{variant.slug}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{variant.tagline}</p>
          <p className="text-xs text-muted-foreground mt-0.5">CAPI Method: <span className="font-medium text-foreground">{variant.capiMethod}</span></p>
          <div className="flex gap-3 mt-3">
            <a href={variant.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"><Github className="w-3.5 h-3.5" /> GitHub</a>
            <a href={variant.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"><Eye className="w-3.5 h-3.5" /> Live Site</a>
          </div>
        </div>
      </div>

      {/* Pillar Ratings */}
      <div className="px-5 pb-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">CAPI Quality Pillars</h4>
        <div className="flex flex-wrap gap-2">
          {([
            ["Coverage", variant.pillars.eventCoverage],
            ["EMQ", variant.pillars.emq],
            ["Dedup", variant.pillars.dedup],
            ["Freshness", variant.pillars.dataFreshness],
            ["Params", variant.pillars.paramCompleteness],
            ["Privacy", variant.pillars.privacyDpo],
            ["Impl", variant.pillars.implQuality],
          ] as [string, PillarRating][]).map(([label, rating]) => (
            <div key={label} className="flex items-center gap-1">
              <span className="text-[10px] text-muted-foreground">{label}:</span>
              <PillarBadge rating={rating} />
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="px-5 pb-4">
        <p className="text-sm leading-relaxed">{variant.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          <div className="bg-muted/50 rounded-sm p-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Pixel Summary</h4>
            <p className="text-xs leading-relaxed">{variant.pixelSummary}</p>
          </div>
          <div className="bg-muted/50 rounded-sm p-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">CAPI Summary</h4>
            <p className="text-xs leading-relaxed">{variant.capiSummary}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">Strengths</h4>
            <ul className="space-y-1">
              {variant.keyStrengths.map((s, i) => (
                <li key={i} className="text-xs flex items-start gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" /><span>{s}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-2">Issues</h4>
            <ul className="space-y-1">
              {variant.keyIssues.map((s, i) => (
                <li key={i} className="text-xs flex items-start gap-1.5"><XCircle className="w-3 h-3 text-red-400 mt-0.5 shrink-0" /><span>{s}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <button onClick={() => setExpanded(!expanded)} className="w-full px-5 py-3 border-t border-border flex items-center justify-between text-xs font-medium text-muted-foreground hover:bg-muted/30 transition-colors">
        <span>Detailed Feature Matrix</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-border">
          <table className="w-full text-xs mt-3">
            <thead><tr className="border-b border-border"><th className="text-left py-2 font-semibold text-muted-foreground">Feature</th><th className="text-left py-2 font-semibold text-muted-foreground">Status</th></tr></thead>
            <tbody className="divide-y divide-border/50">
              {([
                ["Pixel Base Code", variant.details.pixelBaseCode], ["Pixel ID", variant.details.pixelId],
                ["noscript Fallback", variant.details.noscriptFallback], ["Advanced Matching", variant.details.advancedMatching],
                ["PageView Event", variant.details.pageViewEvent], ["ViewContent Event", variant.details.viewContentEvent],
                ["AddToCart Event", variant.details.addToCartEvent], ["InitiateCheckout Event", variant.details.initiateCheckoutEvent],
                ["Purchase Event", variant.details.purchaseEvent], ["Lead Event", variant.details.leadEvent],
                ["Contact Event", variant.details.contactEvent], ["CompleteRegistration Event", variant.details.registrationEvent],
                ["Search Event", variant.details.searchEvent], ["event_id (Dedup)", variant.details.eventId],
                ["setUserData Calls", variant.details.setUserData], ["CAPI Present", variant.details.capiPresent],
                ["CAPI Server-Side", variant.details.capiServerSide], ["CAPI PII Hashing", variant.details.capiHashing],
                ["CAPI User Data", variant.details.capiUserData], ["CAPI fbc/fbp Cookies", variant.details.capiFbcFbp],
                ["CAPI Deduplication", variant.details.capiDeduplication], ["CAPI data_processing_options", variant.details.capiDataProcessingOptions],
                ["Duplicate Events", variant.details.duplicateEvents], ["Legacy img Pixel", variant.details.legacyImgPixel],
                ["Double fbevents.js Load", variant.details.doubleFbeventsLoad], ["Wrong Parameter Names", variant.details.wrongParamNames],
                ["Currency Consistency", variant.details.currencyConsistency],
              ] as [string, boolean | string][]).map(([label, status]) => (
                <tr key={label}><td className="py-1.5">{label}</td><td className="py-1.5 flex items-center gap-1.5"><StatusIcon status={status} /><StatusLabel status={status} /></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================

export default function Variants() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-[family-name:var(--font-display)] tracking-tight">Elevé</Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
            <span className="font-medium text-foreground">Variants</span>
          </div>
        </div>
      </nav>

      <div className="container py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] tracking-tight mb-4">Pixel & CAPI Variants Directory</h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-2">
            14 versions of the same e-commerce site, each with a different quality of Meta Pixel and Conversions API integration.
            Built for testing pixel/CAPI analysis skills — from near-perfect to catastrophically broken.
          </p>
          <p className="text-sm text-muted-foreground max-w-3xl">
            Pixel ID: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">1684145446350033</code> &nbsp;|&nbsp;
            All sites share the same UI, products, and page structure. Only the tracking code differs.
          </p>
        </motion.div>
      </div>

      {/* ===== CAPI PILLAR MATRIX ===== */}
      <div className="container pb-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <h2 className="text-2xl font-[family-name:var(--font-display)] mb-4">CAPI Quality Pillar Matrix</h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-3xl">
            Each variant rated across 7 key CAPI quality pillars: Event Coverage, Event Match Quality (EMQ), Deduplication, Data Freshness, Parameter Completeness, Privacy/DPO, and Implementation Quality.
          </p>
          <div className="overflow-x-auto border border-border rounded-sm">
            <table className="w-full text-xs whitespace-nowrap">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-semibold sticky left-0 bg-muted/50 z-10">Variant</th>
                  <th className="p-3 font-semibold text-center">Grade</th>
                  <th className="p-3 font-semibold text-center">Links</th>
                  <th className="p-3 font-semibold text-center">CAPI Method</th>
                  <th className="p-3 font-semibold text-center">Coverage</th>
                  <th className="p-3 font-semibold text-center">EMQ</th>
                  <th className="p-3 font-semibold text-center">Dedup</th>
                  <th className="p-3 font-semibold text-center">Freshness</th>
                  <th className="p-3 font-semibold text-center">Params</th>
                  <th className="p-3 font-semibold text-center">Privacy</th>
                  <th className="p-3 font-semibold text-center">Impl</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {variants.map((v) => (
                  <tr key={v.slug} className="hover:bg-muted/20">
                    <td className="p-3 font-medium sticky left-0 bg-card z-10">{v.name}</td>
                    <td className="p-3 text-center"><span className={`${v.gradeColor} text-white text-[10px] font-bold px-1.5 py-0.5 rounded`}>{v.grade}</span></td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <a href={v.repo} target="_blank" rel="noopener noreferrer" title="GitHub Repo" className="text-muted-foreground hover:text-primary transition-colors"><Github className="w-3.5 h-3.5" /></a>
                        <a href={v.liveUrl} target="_blank" rel="noopener noreferrer" title="Live Site" className="text-muted-foreground hover:text-primary transition-colors"><ExternalLink className="w-3.5 h-3.5" /></a>
                      </div>
                    </td>
                    <td className="p-3 text-center text-[10px] font-medium">{v.capiMethod}</td>
                    <td className="p-3 text-center"><PillarBadge rating={v.pillars.eventCoverage} /></td>
                    <td className="p-3 text-center"><PillarBadge rating={v.pillars.emq} /></td>
                    <td className="p-3 text-center"><PillarBadge rating={v.pillars.dedup} /></td>
                    <td className="p-3 text-center"><PillarBadge rating={v.pillars.dataFreshness} /></td>
                    <td className="p-3 text-center"><PillarBadge rating={v.pillars.paramCompleteness} /></td>
                    <td className="p-3 text-center"><PillarBadge rating={v.pillars.privacyDpo} /></td>
                    <td className="p-3 text-center"><PillarBadge rating={v.pillars.implQuality} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* ===== QUICK COMPARISON (PIXEL FEATURES) ===== */}
      <div className="container pb-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <h2 className="text-2xl font-[family-name:var(--font-display)] mb-4">Pixel Feature Comparison</h2>
          <div className="overflow-x-auto border border-border rounded-sm">
            <table className="w-full text-xs whitespace-nowrap">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-semibold sticky left-0 bg-muted/50 z-10">Variant</th>
                  <th className="p-3 font-semibold text-center">Pixel ID</th>
                  <th className="p-3 font-semibold text-center">Adv. Match</th>
                  <th className="p-3 font-semibold text-center">noscript</th>
                  <th className="p-3 font-semibold text-center">Events</th>
                  <th className="p-3 font-semibold text-center">event_id</th>
                  <th className="p-3 font-semibold text-center">CAPI</th>
                  <th className="p-3 font-semibold text-center">Hashing</th>
                  <th className="p-3 font-semibold text-center">Dupes</th>
                  <th className="p-3 font-semibold text-center">Legacy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {variants.map((v) => (
                  <tr key={v.slug + "-pixel"} className="hover:bg-muted/20">
                    <td className="p-3 font-medium sticky left-0 bg-card z-10">{v.name}</td>
                    <td className="p-3 text-center"><StatusIcon status={v.details.pixelId} /></td>
                    <td className="p-3 text-center"><StatusIcon status={v.details.advancedMatching} /></td>
                    <td className="p-3 text-center"><StatusIcon status={v.details.noscriptFallback} /></td>
                    <td className="p-3 text-center">
                      {[v.details.viewContentEvent, v.details.addToCartEvent, v.details.purchaseEvent, v.details.leadEvent, v.details.contactEvent, v.details.registrationEvent]
                        .filter(e => e === "correct").length}/6
                    </td>
                    <td className="p-3 text-center"><StatusIcon status={v.details.eventId} /></td>
                    <td className="p-3 text-center"><StatusIcon status={v.details.capiPresent} /></td>
                    <td className="p-3 text-center"><StatusIcon status={v.details.capiHashing} /></td>
                    <td className="p-3 text-center"><StatusIcon status={!v.details.duplicateEvents} /></td>
                    <td className="p-3 text-center"><StatusIcon status={!v.details.legacyImgPixel} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* ===== DETAILED CARDS ===== */}
      <div className="container pb-16">
        <h2 className="text-2xl font-[family-name:var(--font-display)] mb-6">Detailed Breakdown</h2>
        <div className="space-y-4">
          {variants.map((variant, index) => (
            <VariantCard key={variant.slug} variant={variant} index={index} />
          ))}
        </div>
      </div>

      {/* Key Files Reference */}
      <div className="container pb-16">
        <h2 className="text-2xl font-[family-name:var(--font-display)] mb-4">Key Files to Analyze</h2>
        <div className="border border-border rounded-sm p-5 bg-card">
          <p className="text-sm text-muted-foreground mb-4">When running your pixel/CAPI analysis skill against these repos, these are the primary files to inspect:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold mb-2">Pixel Configuration</h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li><code className="bg-muted px-1.5 py-0.5 rounded">client/index.html</code> — Pixel base code, init, advanced matching, noscript</li>
                <li><code className="bg-muted px-1.5 py-0.5 rounded">client/src/lib/meta-pixel.ts</code> — All event tracking functions + CAPI</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2">Event Trigger Points</h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li><code className="bg-muted px-1.5 py-0.5 rounded">client/src/pages/ProductDetail.tsx</code> — ViewContent</li>
                <li><code className="bg-muted px-1.5 py-0.5 rounded">client/src/components/ProductCard.tsx</code> — AddToCart</li>
                <li><code className="bg-muted px-1.5 py-0.5 rounded">client/src/components/CartDrawer.tsx</code> — InitiateCheckout</li>
                <li><code className="bg-muted px-1.5 py-0.5 rounded">client/src/pages/Checkout.tsx</code> — Purchase</li>
                <li><code className="bg-muted px-1.5 py-0.5 rounded">client/src/pages/Contact.tsx</code> — Lead, Contact</li>
                <li><code className="bg-muted px-1.5 py-0.5 rounded">client/src/pages/Register.tsx</code> — CompleteRegistration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-border py-8">
        <div className="container text-center text-xs text-muted-foreground">
          Built for testing Meta Pixel & CAPI analysis skills. All sites use Pixel ID 1684145446350033.
        </div>
      </footer>
    </div>
  );
}
