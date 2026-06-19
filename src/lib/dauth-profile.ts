export type NormalizedDauthProfile = {
  batch: string | null;
  dauthId: string;
  email: string;
  name: string;
};

export function normalizeDauthProfile(
  profile: Record<string, unknown>,
): NormalizedDauthProfile {
  const email = String(profile.email ?? "").toLowerCase();
  const name = String(profile.name ?? email);
  const dauthId = String(profile.id ?? "");
  const batch = typeof profile.batch === "string" ? profile.batch : null;

  if (!email.endsWith("@nitt.edu")) {
    throw new Error("Only NITT email addresses are allowed");
  }

  if (!dauthId) {
    throw new Error("DAuth profile did not include id");
  }

  return {
    batch,
    dauthId,
    email,
    name,
  };
}
