import { createClient } from "@supabase/supabase-js";

const supabaseConnection = createClient(
  "https://xexkwbqgwmfjmghirwgq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhleGt3YnFnd21mam1naGlyd2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3NTQ0MTgsImV4cCI6MjAyMzMzMDQxOH0.OUAYVmw_YxuqKUO0hQyIoNJbWoA26yV-f71DpHh_FCY"
);

export { supabaseConnection };
