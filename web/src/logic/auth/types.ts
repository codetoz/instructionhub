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

export interface User {
  id: string;
  scope: string;
  emailVerified: boolean;
  fullName: string;
  username: string;
  name: string;
  lastName: string;
  email: string;
}
