export function proxiedImage(url?: string | null, version?: string | number | null): string | undefined {
    if (!url) return undefined;
    if (url.startsWith("blob:") || url.startsWith("/")) return url;
    const proxied = `/api/image-proxy?url=${encodeURIComponent(url)}`;
    return version ? `${proxied}&v=${encodeURIComponent(String(version))}` : proxied;
}
