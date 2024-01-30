import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://bnhhjgfpyezbmqdzhxis.supabase.co";
// eslint-disable-next-line no-undef
//process.env.SUPABASE_KEY;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJuaGhqZ2ZweWV6Ym1xZHpoeGlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM1MTAwNjIsImV4cCI6MjAxOTA4NjA2Mn0.zUlNP5Hjf4ZTNOFEAoBkUg6JP-xIkKv-bTQSwRJUu70";
// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
