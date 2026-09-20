import { kv } from "@vercel/kv";

export type Registration = {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  proofUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

const REGISTRATIONS_INDEX = "registrations:index";

export function registrationKey(id: string) {
  return `registration:${id}`;
}

export async function saveRegistration(registration: Registration) {
  await kv.set(registrationKey(registration.id), registration);
  await kv.sadd(REGISTRATIONS_INDEX, registration.id);
}

export async function getRegistration(id: string) {
  return kv.get<Registration>(registrationKey(id));
}

export async function updateRegistrationProof(id: string, proofUrl: string) {
  const existing = await getRegistration(id);
  if (!existing) return null;
  const updated: Registration = {
    ...existing,
    proofUrl,
    updatedAt: new Date().toISOString(),
  };
  await kv.set(registrationKey(id), updated);
  return updated;
}

export async function listRegistrations() {
  const ids = await kv.smembers(REGISTRATIONS_INDEX);
  if (!ids || ids.length === 0) return [];
  const registrations = await Promise.all(
    ids.map((id) => getRegistration(id))
  );
  return registrations
    .filter((r): r is Registration => Boolean(r))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
