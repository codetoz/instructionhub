export interface KeycloakJwtPayload {
  sub: string; // userId
  scope: string;
  email_verified: boolean;
  name: string; // full name
  preferred_username: string; // username
  given_name: string; // name
  family_name: string; // lastName
  email: string;
}
