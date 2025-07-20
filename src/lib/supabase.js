import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ornlfmkkhaubqhdjdrnp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ybmxmbWtraGF1YnFoZGpkcm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwODMwMzMsImV4cCI6MjA2NTY1OTAzM30.leZAVVMlK5oNKcLEmuUKMHW5bSk49WJ8bN-vgGy8QUo'

// Tambahkan konfigurasi tambahan untuk mengatasi CORS dan network issues
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})
