const baseUrl = process.env.EXPO_PUBLIC_API_URL;

if (!baseUrl) {
  throw new Error("Missing EXPO_PUBLIC_API_URL. Copy .env.example to .env.");
}

export const NETWORK_DEFAULTS = Object.freeze({
  baseUrl,
  timeoutMs: 15_000,
  headers: Object.freeze({
    Accept: "application/json",
  }),
});
