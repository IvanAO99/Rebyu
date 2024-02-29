/**
 * A Supabase client instance for interacting with the Supabase database.
 * @typedef {Object} SupabaseClient
 * @property {function} auth.signUp - Sign up a user.
 * @property {function} auth.signIn - Sign in a user.
 * @property {function} auth.signOut - Sign out the authenticated user.
 * @property {function} auth.user - Get the current authenticated user.
 * @property {function} from - Create a query builder for a table.
 * @property {function} rpc - Call a stored procedure.
 * @property {function} removeSubscription - Remove a subscription by its ID.
 * @property {function} setUrl - Set the URL for the Supabase client.
 */

import { createClient } from "@supabase/supabase-js";

/**
 * Supabase connection instance used to interact with the Supabase database.
 * @type {SupabaseClient}
 */
const supabaseConnection = createClient(
  // Supabase URL
  "https://xexkwbqgwmfjmghirwgq.supabase.co",

  // Supabase API key
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhleGt3YnFnd21mam1naGlyd2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3NTQ0MTgsImV4cCI6MjAyMzMzMDQxOH0.OUAYVmw_YxuqKUO0hQyIoNJbWoA26yV-f71DpHh_FCY"
);

/**
 * Exporting the Supabase connection instance.
 * @module supabaseConnection
 */
export { supabaseConnection };
