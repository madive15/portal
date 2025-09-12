export const toBytes = (data: string, mime: string) => {
  const results = [];
  const byteChars = atob(data);
  for (let offset = 0; offset < byteChars.length; offset += 512) {
    const slice = byteChars.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    results.push(byteArray);
  }

  return new Blob(results, { type: mime });
};


export function formatComma(value: number | string): string {
  if (!value) return '0';
  // 숫자가 아닐 경우 처리
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  return numericValue.toLocaleString('ko-KR'); // 한국 숫자 형식
}