/**
 * ⚠️ PLACEHOLDER — Cloudinary uploads not wired yet.
 *
 * For now images are stored as plain URL strings (Unsplash / external URLs)
 * on each document. When the admin needs real uploads, install the
 * `cloudinary` SDK, add credentials to .env, and implement `uploadImage` here.
 */
export async function uploadImage(url: string): Promise<string> {
  // No-op: returns the URL as-is.
  return url;
}
