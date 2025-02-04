import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://hxyuutkgtgcugaxwuhrc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4eXV1dGtndGdjdWdheHd1aHJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0OTE0NDAsImV4cCI6MjA1NDA2NzQ0MH0.cNjMT0NlDR0q7kXZw_hCUUAZk7-vFE7peZwc2BVUzQs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
