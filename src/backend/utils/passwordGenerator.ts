export function generatePassword(
  length = 20,
  passwordChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
): string {
  return Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((x) => passwordChars[x % passwordChars.length])
    .join('');
}
