import Keycloak, { KeycloakLoginOptions } from 'keycloak-js';
import { KeycloakJwtPayload, User } from './types';
import useAuthStore from './store';

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

export async function authenticateUser() {
  try {
    const authenticated = await keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${location.origin}/silent-check-sso.html`,
    });
    if (authenticated) {
      const keycloakPayload = keycloak.tokenParsed as KeycloakJwtPayload;
      useAuthStore.getState().setUser({
        fullName: keycloakPayload.name,
        username: keycloakPayload.preferred_username,
        id: keycloakPayload.sub,
        scope: keycloakPayload.scope,
        lastName: keycloakPayload.family_name,
        name: keycloakPayload.given_name,
        email: keycloakPayload.email,
        emailVerified: keycloakPayload.email_verified,
      });
    } else {
      return undefined;
    }
  } catch (e) {
    return undefined;
  }
}

export function login() {
  void keycloak.login();
}

export function logout() {
  return keycloak.logout();
}

export function getAuthToken() {
  return keycloak.token;
}

export function getClientUser() {
  return useAuthStore.getState().user;
}
