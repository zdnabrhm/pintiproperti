// Google Sheets API service
// Submits property check form data to Google Spreadsheet via Apps Script

import type { PropertyCheckSchema } from "@/features/property-check/schema";

// The Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = import.meta.env.PUBLIC_GOOGLE_SCRIPT_URL;

export interface GoogleSheetsResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Configurable timeout for fetch requests (in milliseconds)
const FETCH_TIMEOUT_MS = 10_000; // 10 seconds

export async function submitToGoogleSheets(
  data: PropertyCheckSchema,
): Promise<GoogleSheetsResponse> {
  if (!GOOGLE_SCRIPT_URL) {
    console.warn("Google Script URL not configured");
    return {
      success: false,
      error: "Google Sheets integration not configured",
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, FETCH_TIMEOUT_MS);

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // Apps Script doesn't return proper CORS headers for POST
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    // Clear timeout on success
    clearTimeout(timeoutId);

    // With no-cors mode, we can't read the response
    // We assume success if no error was thrown
    return { success: true, message: "Data submitted successfully" };
  } catch (error) {
    // Clear timeout to avoid memory leak
    clearTimeout(timeoutId);

    // Handle abort/timeout specifically
    if (error instanceof Error && error.name === "AbortError") {
      console.error(
        `Google Sheets request timed out after ${FETCH_TIMEOUT_MS}ms`,
      );
      return {
        success: false,
        error: `Request timed out after ${FETCH_TIMEOUT_MS / 1000} seconds`,
      };
    }

    console.error("Failed to submit to Google Sheets:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
