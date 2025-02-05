import Keycloak from 'keycloak-js';
import { KeycloakJwtPayload } from './types';

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

export async function initAuth() {
  try {
    const authenticated = await keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${location.origin}/silent-check-sso.html`,
    });
    if (authenticated) {
      return keycloak.tokenParsed as KeycloakJwtPayload;
    } else {
      return undefined;
    }
  } catch (e) {
    return undefined;
  }
}

export function login() {
  keycloak.login();
}

export function logout() {
  return keycloak.logout();
}

export function getAuthToken() {
  return keycloak.token;
}
