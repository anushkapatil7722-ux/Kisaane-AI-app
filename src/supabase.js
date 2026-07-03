import { createClient } from '@supabase/supabase-js';

// Retrieve Supabase credentials from Vite environment variables (or Expo fallback)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.EXPO_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Initialize and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
