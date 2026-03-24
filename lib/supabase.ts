import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    "https://dbpxpzolnjewgzgifyno.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicHhwem9sbmpld2d6Z2lmeW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNDcwNDEsImV4cCI6MjA4OTkyMzA0MX0.NIIFCPeCeaTHFXSZMr5I24KffMgApixElLoT5TeDQh8",
  );
}
