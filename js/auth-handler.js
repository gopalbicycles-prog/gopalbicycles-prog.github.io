(() => {
  // === Supabase configuration ===
  // You can optionally override these at runtime by setting:
  //   window.__SUPABASE_URL__ and window.__SUPABASE_ANON_KEY__
  // before this script loads (useful for forks/environments).
  const DEFAULT_SUPABASE_URL = 'https://qoxszxcvagfhsjizlujw.supabase.co';
  const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFveHN6eGN2YWdmaHNqaXpsdWp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwNjE3MDYsImV4cCI6MjA4MzYzNzcwNn0.o_zU1xTD1aHJViyQrI2ZHQRfeSRm-1uAsRyCaKhpfTk';

  const SUPABASE_URL = String(window.__SUPABASE_URL__ || DEFAULT_SUPABASE_URL).replace(/\/+$/, '');
  const SUPABASE_ANON_KEY = String(window.__SUPABASE_ANON_KEY__ || DEFAULT_SUPABASE_ANON_KEY);

  const SITE_URL =
    (typeof window !== 'undefined' && window.location && window.location.origin && window.location.origin !== 'null')
      ? window.location.origin
      : 'https://gopalbicycles-prog.github.io';
  // Desktop app custom protocol (deep link)
  const APP_PROTOCOL = 'gopaldesk';

  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  function deepLinkUrl(params = {}) {
    const query = new URLSearchParams(params).toString();
    return `${APP_PROTOCOL}://auth?${query}`;
  }

  async function signUp({ email, password, name, company }) {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${SITE_URL}/auth/confirm-email.html`,
        data: { name: name || null, company: company || null }
      }
    });
  }

  async function login({ email, password }) {
    return supabase.auth.signInWithPassword({ email, password });
  }

  async function requestPasswordReset(email) {
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${SITE_URL}/auth/reset-password.html`
    });
  }

  async function setSessionFromHash(hashString) {
    const hashParams = new URLSearchParams(hashString.replace(/^#/, ''));
    const access_token = hashParams.get('access_token');
    const refresh_token = hashParams.get('refresh_token');
    if (!access_token || !refresh_token) {
      return { data: null, error: new Error('Missing session tokens in URL') };
    }
    return supabase.auth.setSession({ access_token, refresh_token });
  }

  async function updatePassword(newPassword) {
    return supabase.auth.updateUser({ password: newPassword });
  }

  window.authApi = {
    supabase,
    SITE_URL,
    APP_PROTOCOL,
    deepLinkUrl,
    signUp,
    login,
    requestPasswordReset,
    setSessionFromHash,
    updatePassword
  };
})();