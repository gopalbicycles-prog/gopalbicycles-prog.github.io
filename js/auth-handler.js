(() => {
  // === Supabase configuration ===
  const SUPABASE_URL = 'https://yfjzhsasfpfryhbokikf.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_Fr9Eb1q5ybTvlCQohViR3Q_t6vvvvwo';
  const SITE_URL = 'https://gopalbicycles-prog.github.io';
  // TODO: Replace with your desktop app's custom protocol (e.g., 'myapp')
  const APP_PROTOCOL = 'yourapp';

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