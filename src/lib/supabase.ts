import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: SupabaseClient;

const isValidSupabaseUrl = (url: string | undefined): url is string => {
    if (!url) return false;
    try {
        const u = new URL(url);
        // A simple check for a valid URL format and a plausible Supabase hostname.
        // e.g., https://[project-ref].supabase.co
        return u.protocol === 'https:' && u.hostname.endsWith('.supabase.co') && u.hostname.split('.').length > 2;
    } catch (e) {
        return false;
    }
};

if (isValidSupabaseUrl(supabaseUrl) && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn(
    'Supabase credentials are not valid or not provided in .env file. App will run in a mock/offline mode. Please connect your Supabase project for full functionality.'
  );

  // Create a mock client that prevents crashes and returns empty/error states.
  const mockError = { message: 'Supabase is not configured. Please connect a project.', name: 'MockError', status: 500 };
  supabase = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: mockError }),
      signUp: () => Promise.resolve({ data: { user: null, session: null }, error: mockError }),
      signOut: () => Promise.resolve({ error: null }),
    },
    from: (table: string) => ({
      select: () => Promise.resolve({ data: [], error: { ...mockError, message: `${mockError.message} Cannot select from '${table}'.` } }),
      insert: () => Promise.resolve({ data: [], error: { ...mockError, message: `${mockError.message} Cannot insert into '${table}'.` } }),
      update: () => Promise.resolve({ data: [], error: { ...mockError, message: `${mockError.message} Cannot update '${table}'.` } }),
      delete: () => Promise.resolve({ data: [], error: { ...mockError, message: `${mockError.message} Cannot delete from '${table}'.` } }),
    }),
    storage: {
        from: (bucket: string) => ({
            upload: () => Promise.resolve({ data: null, error: { ...mockError, message: `${mockError.message} Cannot upload to '${bucket}'.` } }),
            download: () => Promise.resolve({ data: null, error: { ...mockError, message: `${mockError.message} Cannot download from '${bucket}'.` } }),
        })
    }
  } as unknown as SupabaseClient;
}

export { supabase };
