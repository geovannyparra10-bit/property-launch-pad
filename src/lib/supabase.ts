import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fncxbhljgxzwojgkjxos.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuY3hiaGxqZ3h6d29qZ2tqeG9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMjkxMjcsImV4cCI6MjA4NzcwNTEyN30.k8c_1wQlT-Y2qOgjJ9Y7wA01orrIuxF-RzXeLcowx_U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
