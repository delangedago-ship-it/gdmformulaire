import { createHash } from "crypto";

export const ADMIN_COOKIE = "gdm_admin_session";

export function adminSessionToken(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

export function isValidAdminSession(cookieValue: string | undefined) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || !cookieValue) return false;
  return cookieValue === adminSessionToken(password);
}
