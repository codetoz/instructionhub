export function getUsernameFromEmail(email: string) {
  const nameMatch = email.match(/^([^@]*)@/);
  return nameMatch ? nameMatch[1] : undefined;
}
