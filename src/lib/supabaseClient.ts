import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://ckhtcpymffyahghuxlri.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNraHRjcHltZmZ5YWhnaHV4bHJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2ODgxOTMsImV4cCI6MjA1NzI2NDE5M30.iuK47XzL8Dulo1DWxMPWEJN1iUsAo4sa8vg5_iRXLoo')