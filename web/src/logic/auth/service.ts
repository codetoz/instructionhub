import Keycloak, { KeycloakLoginOptions } from 'keycloak-js';
import { KeycloakJwtPayload, User } from './types';

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

export async function getUserInfo(): Promise<User | undefined> {
  try {
    const authenticated = await keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${location.origin}/silent-check-sso.html`,
    });
    if (authenticated) {
      const keycloakPayload = keycloak.tokenParsed as KeycloakJwtPayload;
      return {
        fullName: keycloakPayload.name,
        username: keycloakPayload.preferred_username,
        id: keycloakPayload.sub,
        scope: keycloakPayload.scope,
        lastName: keycloakPayload.family_name,
        name: keycloakPayload.given_name,
        email: keycloakPayload.email,
        emailVerified: keycloakPayload.email_verified,
      };
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
