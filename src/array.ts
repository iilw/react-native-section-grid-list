export function chunkArray<T>(arr: readonly T[], num: number): T[][] {
  if (num <= 0 || !arr.length) return [];

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += num) {
    result.push(arr.slice(i, i + num));
  }

  return result;
}
