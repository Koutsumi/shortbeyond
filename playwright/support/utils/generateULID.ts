export function gerarULID(): string {
  const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // Crockford's Base32 (sem I, L, O, U)
  
  function encodeTime(time: number, length: number): string {
    let str = '';
    for (let i = length - 1; i >= 0; i--) {
      const mod = time % 32;
      str = ENCODING[mod] + str;
      time = Math.floor(time / 32);
    }
    return str;
  }

  function encodeRandom(length: number): string {
    let str = '';
    for (let i = 0; i < length; i++) {
      const rand = Math.floor(Math.random() * 32);
      str += ENCODING[rand];
    }
    return str;
  }

  const timestamp = Date.now();
  const timePart = encodeTime(timestamp, 10); // 48 bits = 10 chars
  const randomPart = encodeRandom(16);        // 80 bits = 16 chars

  return timePart + randomPart;
}