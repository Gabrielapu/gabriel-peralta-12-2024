// Permite obtener el id en base a la URL
export function useSplitUrl(url: string, delimiter: string): string {
  return url.split(delimiter).slice(-2, -1)[0];
}