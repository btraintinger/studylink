export default function wrongNumberToNumber(
  number: number | undefined
): number {
  return parseInt(number as unknown as string, 10);
}
