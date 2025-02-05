import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

export async function initAuth() {
  console.log(location.origin);
  try {
    const authenticated = await keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${location.origin}/silent-check-sso.html`,
    });
    console.log({ authenticated });
    if (authenticated) {
      // localStorage.setItem('user', JSON.stringify(keycloak.tokenParsed));
      return keycloak.tokenParsed;
    } else {
      // localStorage.removeItem('user');
      return null;
    }
  } catch (e) {
    localStorage.removeItem('user');
    return null;
  }
}

export function login() {
  console.log({
    authenticated: keycloak.authenticated,
    token: keycloak.token,
    tokenParsed: { ...keycloak.tokenParsed },
  });
  keycloak.login();
}

export function logout() {
  keycloak.logout();
  localStorage.removeItem('user');
}

keycloak.onAuthSuccess = () => {
  console.log('on auth success');
  console.log(keycloak.tokenParsed);
};

export function getAuthToken() {
  return keycloak.token;
}
