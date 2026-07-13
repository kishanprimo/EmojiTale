const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ?? "";

export function resolveImageUrl(path: string): string | null {
    if (!path) return null;
    // Strip the API base to get a relative path
    let url = (path.startsWith("http://") || path.startsWith("https://"))
        ? path.replace(API_BASE, "")
        : path;
    // Ensure leading slash
    if (!url.startsWith("/")) url = `/${url}`;
    // Fix double slash e.g. //avatars/ -> /uploads/avatars/
    url = url.replace(/^\/\//, "/uploads/");
    // Fix double uploads prefix e.g. /uploads/uploads/
    url = url.replace(/^\/uploads\/uploads\//, "/uploads/");
    return url;
}
