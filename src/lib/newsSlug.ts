// Helpers to slugify and de-slugify news item identifiers so that we can
// build clean, share-friendly /news/:slug URLs without a database lookup.

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/**
 * Build a deterministic slug from a news item id + title.
 * Format: <id>__<title-slug>
 * The id segment lets us look the item back up; the title segment is for SEO.
 */
export function buildNewsSlug(id: string, title: string): string {
  const safeId = encodeURIComponent(id);
  return `${safeId}__${slugify(title)}`;
}

export function parseNewsSlug(slug: string): { id: string } {
  const [rawId] = slug.split("__");
  return { id: decodeURIComponent(rawId ?? "") };
}
