import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UserProgress {
  id: string;
  user_id: string;
  session_index: number;
  completed: boolean;
  completed_at?: string;
  created_at: string;
}

export interface UserSettings {
  id: string;
  user_id: string;
  start_date: string;
  sessions_per_day: number;
  created_at: string;
  updated_at: string;
}
