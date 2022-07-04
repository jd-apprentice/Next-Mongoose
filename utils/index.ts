export function urlSlicer(url: string): string {
  return url.includes("format")
    ? url.substring(0, url.indexOf("format") - 1) + ".jpg"
    : url;
}
