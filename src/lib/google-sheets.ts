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

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", // Apps Script doesn't return proper CORS headers for POST
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(data),
    });

    // With no-cors mode, we can't read the response
    // We assume success if no error was thrown
    return { success: true, message: "Data submitted successfully" };
  } catch (error) {
    console.error("Failed to submit to Google Sheets:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
