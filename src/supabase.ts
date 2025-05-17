import { createClient } from '@supabase/supabase-js';
import { SecureStorage } from "@plasmohq/storage/secure";

const storage = new SecureStorage()

export const supabase = createClient(
    process.env.PLASMO_PUBLIC_SUPABASE_URL,
    process.env.PLASMO_PUBLIC_SUPABASE_KEY,
    {
        auth: {
            storage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
        }
    }
);