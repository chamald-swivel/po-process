import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    "https://snregmhjviiklvxkiwpp.supabase.co",
    "eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNucmVnbWhqdmlpa2x2eGtpd3BwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyOTMzNTAsImV4cCI6MjA3Mzg2OTM1MH0.QV2xQI-6MNUXNP9kFleOBUSFONCmki84RaCYLvqxl6I",
  );
}
