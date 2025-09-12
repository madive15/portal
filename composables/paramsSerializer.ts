export function customParamsSerializer(params: Record<string, any>): string {
  return Object.entries(params)
    .filter(([, value]) => value != undefined && value !== null)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value
          .map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
          .join('&');
      } else {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`;
      }
    })
    .join('&');
}
