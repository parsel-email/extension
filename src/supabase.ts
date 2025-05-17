import { createClient } from '@supabase/supabase-js';
import { SecureStorage } from "@plasmohq/storage/secure";

const storage = new SecureStorage()

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    {
        auth: {
            storage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
        }
    }
);