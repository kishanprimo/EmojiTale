// export function proxiedImage(url?: string | null, version?: string | number | null): string | undefined {
//     if (!url) return undefined;
//     if (url.startsWith("blob:") || url.startsWith("/")) return url;
//     const proxied = `/api/image-proxy?url=${encodeURIComponent(url)}`;
//     return version ? `${proxied}&v=${encodeURIComponent(String(version))}` : proxied;
// }

// Guard against non-string values.
// Prevents runtime crashes if an object or null is accidentally
// passed instead of an image URL.
export function proxiedImage(
    url?: unknown,
    version?: string | number | null
): string | undefined {

    console.log("proxiedImage received:", url, typeof url);

    if (typeof url !== "string") {
        return undefined;
    }

    if (url.startsWith("blob:") || url.startsWith("/")) {
        return url;
    }

    const proxied = `/api/image-proxy?url=${encodeURIComponent(url)}`;

    return version
        ? `${proxied}&v=${encodeURIComponent(String(version))}`
        : proxied;
}