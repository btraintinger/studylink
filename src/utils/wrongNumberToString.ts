export default function wrongNumberToNumber(number: number): number {
  return parseInt(number as unknown as string, 10);
}
