import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

export const runtime = "nodejs";

type UpdateItem = {
  title: string;
  description: string;
  date: string; // ISO
  source: string;
  link: string;
  category: string;
  image?: string; // optional image URL from feed
};

type ApiResponse = {
  success: boolean;
  updatedAt: string; // ISO
  items: UpdateItem[];
};

const ONE_HOUR_MS = 60 * 60 * 1000;

const FEEDS: { category: string; source: string; url: string }[] = [
  // Prefer official RBI RSS (available and reliable)
  {
    category: "RBI Notifications",
    source: "RBI (Official)",
    url: "https://rbi.org.in/notifications_rss.xml",
  },
  {
    category: "RBI Notifications",
    source: "RBI Press Releases (Official)",
    url: "https://rbi.org.in/pressreleases_rss.xml",
  },

  // Other topics via public RSS (no API keys). These use Google News RSS searches.
  {
    category: "Income Tax",
    source: "Google News",
    url: "https://news.google.com/rss/search?q=India%20Income%20Tax%20update&hl=en-IN&gl=IN&ceid=IN:en",
  },
  {
    category: "GST",
    source: "Google News",
    url: "https://news.google.com/rss/search?q=GST%20notification%20India&hl=en-IN&gl=IN&ceid=IN:en",
  },
  {
    category: "MCA Updates",
    source: "Google News",
    url: "https://news.google.com/rss/search?q=MCA%20compliance%20update%20India&hl=en-IN&gl=IN&ceid=IN:en",
  },
  {
    category: "SEBI Circulars",
    source: "Google News",
    url: "https://news.google.com/rss/search?q=SEBI%20circular%20latest&hl=en-IN&gl=IN&ceid=IN:en",
  },
  {
    category: "Budget Announcements",
    source: "Google News",
    url: "https://news.google.com/rss/search?q=India%20Budget%20announcement&hl=en-IN&gl=IN&ceid=IN:en",
  },
];

let cache: { ts: number; data: ApiResponse } | null = null;

function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function toIsoDate(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

function safeText(value: unknown): string {
  if (typeof value === "string") return stripHtml(value);
  return "";
}

/** Extract first image URL from HTML string. */
function extractFirstImageUrl(html: string): string | null {
  if (typeof html !== "string" || !html.trim()) return null;
  const match = html.match(/<img[^>]+src\s*=\s*["']([^"']+)["']/i);
  return match ? match[1].trim() : null;
}

/** Get image URL from RSS item: media:*, enclosure, or first img in description. */
function getImageUrl(it: any): string | null {
  // media:thumbnail (common in RSS 2.0 with Media RSS)
  const thumb = it?.["media:thumbnail"] ?? it?.media?.thumbnail;
  const thumbUrl = Array.isArray(thumb) ? thumb[0]?.["@_url"] ?? thumb[0] : thumb?.["@_url"];
  if (typeof thumbUrl === "string" && thumbUrl.startsWith("http")) return thumbUrl;

  // media:content
  const content = it?.["media:content"] ?? it?.media?.content;
  const contentUrl = Array.isArray(content) ? content[0]?.["@_url"] ?? content[0] : content?.["@_url"];
  if (typeof contentUrl === "string" && contentUrl.startsWith("http")) return contentUrl;

  // enclosure (type image)
  const enc = it?.enclosure;
  if (enc && typeof enc["@_url"] === "string") {
    const type = (enc["@_type"] ?? "").toLowerCase();
    if (type.includes("image")) return enc["@_url"];
  }

  // first <img> in description/summary/content (handle object with #text for parser output)
  const rawDesc =
    (typeof it?.description === "string" ? it.description : null) ||
    (typeof it?.description?.["#text"] === "string" ? it.description["#text"] : null) ||
    (typeof it?.summary === "string" ? it.summary : null) ||
    (typeof it?.summary?.["#text"] === "string" ? it.summary["#text"] : null) ||
    (typeof it?.content === "string" ? it.content : null) ||
    (typeof it?.content?.["#text"] === "string" ? it.content["#text"] : null) ||
    (typeof it?.["content:encoded"] === "string" ? it["content:encoded"] : null);
  const imgFromHtml = rawDesc ? extractFirstImageUrl(rawDesc) : null;
  if (imgFromHtml && imgFromHtml.startsWith("http")) return imgFromHtml;

  return null;
}

/** Default images from public/news – used one by one when no image from feed/og. No repeats. */
const DEFAULT_NEWS_IMAGES: string[] = [
  "/news/pexels-alesiakozik-6770610.jpg",
  "/news/pexels-alesiakozik-6771899.jpg",
  "/news/pexels-anna-nekrashevich-6802052.jpg",
  "/news/pexels-artempodrez-5716027.jpg",
  "/news/pexels-clickerhappy-9660.jpg",
  "/news/pexels-cottonbro-3943732.jpg",
  "/news/pexels-davidmcbee-730564.jpg",
  "/news/pexels-gabby-k-5849577.jpg",
  "/news/pexels-karola-g-4386367.jpg",
  "/news/pexels-kindelmedia-6775160.jpg",
  "/news/pexels-kunitsky-210990.jpg",
  "/news/pexels-liza-summer-6347705.jpg",
  "/news/pexels-maitree-rimthong-444156-1602726.jpg",
  "/news/pexels-mikhail-nilov-6964332.jpg",
  "/news/pexels-olia-danilevich-5466785.jpg",
  "/news/pexels-pixabay-265087.jpg",
  "/news/pexels-pixabay-534216.jpg",
  "/news/pexels-rdne-8369770.jpg",
];

/** First default image – used when we need a single fallback (e.g. no link). */
const FALLBACK_FINANCE_IMAGE = DEFAULT_NEWS_IMAGES[0];

/** Reject image URLs that are Google logo, favicon, or known bad sources. */
function isAcceptableArticleImage(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase();
    if (/google\.(com|co\.\w{2,3})$/.test(host)) return false;
    if (host.includes("googleusercontent.com")) return false;
    if (host.includes("gstatic.com")) return false;
    if (host === "google.com") return false;
    if (host.endsWith("google.com")) return false;
    return true;
  } catch {
    return false;
  }
}

/** Extract og:image or twitter:image from HTML. Returns absolute URL or null. Rejects Google logos. */
function extractOgImage(html: string, baseUrl: string): string | null {
  if (!html || typeof html !== "string") return null;
  const resolve = (url: string): string | null => {
    const u = url.trim().replace(/&amp;/g, "&");
    if (!u.startsWith("http")) {
      try {
        return new URL(u, baseUrl).href;
      } catch {
        return null;
      }
    }
    return u;
  };
  // og:image (preferred)
  const ogMatch = html.match(
    /<meta\s+[^>]*property\s*=\s*["']og:image["'][^>]*content\s*=\s*["']([^"']+)["']/i
  ) || html.match(
    /<meta\s+[^>]*content\s*=\s*["']([^"']+)["'][^>]*property\s*=\s*["']og:image["']/i
  );
  if (ogMatch?.[1]) {
    const url = resolve(ogMatch[1]);
    if (url && isAcceptableArticleImage(url)) return url;
  }
  // twitter:image fallback
  const twMatch = html.match(
    /<meta\s+[^>]*name\s*=\s*["']twitter:image["'][^>]*content\s*=\s*["']([^"']+)["']/i
  ) || html.match(
    /<meta\s+[^>]*content\s*=\s*["']([^"']+)["'][^>]*name\s*=\s*["']twitter:image["']/i
  );
  if (twMatch?.[1]) {
    const url = resolve(twMatch[1]);
    if (url && isAcceptableArticleImage(url)) return url;
  }
  return null;
}

/** Fetch article page HTML (for og:image extraction). */
async function fetchArticleHtml(url: string, timeoutMs = 4500): Promise<string> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; NewsBot/1.0; +https://example.com)",
        accept: "text/html,application/xhtml+xml",
      },
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

/** Fetch article page and return og:image URL, or null. */
async function fetchArticleImage(articleUrl: string): Promise<string | null> {
  try {
    const html = await fetchArticleHtml(articleUrl);
    return extractOgImage(html, articleUrl);
  } catch {
    return null;
  }
}

/** Run promises in batches of size N. */
async function runInBatches<T, R>(
  items: T[],
  batchSize: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(fn));
    results.push(...batchResults);
  }
  return results;
}

async function fetchWithTimeout(url: string, timeoutMs = 12000): Promise<string> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "user-agent": "kanakiya-mehta-website/1.0 (+rss-fetch)",
        accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      // This caches on Vercel's edge when possible
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

function parseRss(xml: string): any[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    removeNSPrefix: true,
  });
  const data = parser.parse(xml);
  const channel = data?.rss?.channel ?? data?.feed;
  const items = channel?.item ?? channel?.entry ?? [];
  return Array.isArray(items) ? items : [items];
}

function normalizeItems(
  rawItems: any[],
  meta: { category: string; source: string }
): UpdateItem[] {
  return rawItems
    .map((it) => {
      const title = safeText(it?.title);
      const link =
        typeof it?.link === "string"
          ? it.link
          : typeof it?.link?.["@_href"] === "string"
            ? it.link["@_href"]
            : typeof it?.guid === "string"
              ? it.guid
              : "";

      const description =
        safeText(it?.description) ||
        safeText(it?.summary) ||
        safeText(it?.content) ||
        "";

      const date =
        toIsoDate(it?.pubDate) ||
        toIsoDate(it?.published) ||
        toIsoDate(it?.updated) ||
        toIsoDate(it?.date) ||
        null;

      // RSS <source> may be either string or object w/ #text
      const sourceFromItem =
        typeof it?.source === "string"
          ? safeText(it.source)
          : typeof it?.source?.["#text"] === "string"
            ? safeText(it.source["#text"])
            : "";

      const image = getImageUrl(it) ?? FALLBACK_FINANCE_IMAGE;

      return {
        title,
        description,
        date: date ?? new Date().toISOString(),
        source: sourceFromItem || meta.source,
        link,
        category: meta.category,
        image,
      } satisfies UpdateItem;
    })
    .filter((x) => x.title && x.link);
}

export async function GET() {
  const now = Date.now();
  if (cache && now - cache.ts < ONE_HOUR_MS) {
    return NextResponse.json(cache.data, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  }

  try {
    const results = await Promise.allSettled(
      FEEDS.map(async (f) => {
        const xml = await fetchWithTimeout(f.url);
        const rawItems = parseRss(xml);
        return normalizeItems(rawItems, { category: f.category, source: f.source });
      })
    );

    const allItems = results
      .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
      .filter(Boolean);

    const dedup = new Map<string, UpdateItem>();
    for (const item of allItems) {
      const key = item.link || `${item.title}:${item.date}`;
      if (!dedup.has(key)) dedup.set(key, item);
    }

    let items = Array.from(dedup.values())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 18);

    // Enrich items that use fallback image: fetch og:image from article page (batched)
    const toEnrich = items.filter(
      (item) =>
        item.link?.startsWith("http") &&
        (item.image === FALLBACK_FINANCE_IMAGE ||
          (item.image?.startsWith("/news/") && DEFAULT_NEWS_IMAGES.includes(item.image)))
    );
    if (toEnrich.length > 0) {
      const links = toEnrich.map((item) => item.link);
      const fetchedUrls = await runInBatches(links, 4, (link) => fetchArticleImage(link));
      const linkToImage = new Map<string, string>();
      links.forEach((link, i) => {
        const url = fetchedUrls[i];
        if (url) linkToImage.set(link, url);
      });
      items = items.map((item) =>
        linkToImage.has(item.link)
          ? { ...item, image: linkToImage.get(item.link)! }
          : item
      );
    }

    // 1) Use default image from public/news for items that still have no real image (no feed, no og:image)
    let nextDefaultIndex = 0;
    items = items.map((item) => {
      const needsDefault =
        item.image === FALLBACK_FINANCE_IMAGE ||
        (item.image?.startsWith("/news/") && DEFAULT_NEWS_IMAGES.includes(item.image));
      if (needsDefault && nextDefaultIndex < DEFAULT_NEWS_IMAGES.length) {
        return { ...item, image: DEFAULT_NEWS_IMAGES[nextDefaultIndex++] };
      }
      return item;
    });

    // 2) Dedupe: if any image URL is repeated, replace duplicates with a unique default image (one by one)
    const usedUrls = new Set<string>();
    const usedDefaultIndices = new Set<number>();
    items = items.map((item) => {
      const url = item.image ?? "";
      if (usedUrls.has(url)) {
        let idx = 0;
        while (idx < DEFAULT_NEWS_IMAGES.length && usedDefaultIndices.has(idx)) idx++;
        if (idx < DEFAULT_NEWS_IMAGES.length) {
          const replacement = DEFAULT_NEWS_IMAGES[idx];
          usedDefaultIndices.add(idx);
          usedUrls.add(replacement);
          return { ...item, image: replacement };
        }
      }
      usedUrls.add(url);
      if (DEFAULT_NEWS_IMAGES.includes(url)) usedDefaultIndices.add(DEFAULT_NEWS_IMAGES.indexOf(url));
      return item;
    });

    const payload: ApiResponse = {
      success: true,
      updatedAt: new Date().toISOString(),
      items,
    };

    cache = { ts: now, data: payload };

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    const payload: ApiResponse = {
      success: false,
      updatedAt: new Date().toISOString(),
      items: [],
    };
    return NextResponse.json(payload, { status: 503 });
  }
}

