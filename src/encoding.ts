/**
 * Encodes a number in IEEE 754 floating point format.
 *
 * @param {number} n - The number to encode.
 * @return {Uint8Array} The encoded number as a Uint8Array.
 */
export const ieee754 = (n: number) => {
    const buf = Buffer.allocUnsafe(4);
    buf.writeFloatLE(n, 0);
    return Uint8Array.from(buf);
  };
  
  export const encodeString = (str: string) => [
    str.length,
    ...str.split("").map(s => s.charCodeAt(0))
  ];
  
/**
 * Encode a number in signed LEB128 format.
 * @param {number} n - The number to encode.
 * @returns {number[]} - The encoded number as an array of bytes.
 */
export const signedLEB128 = (n: number): number[] => {
  const buffer: number[] = [];
  let more = true;
  const isNegative: boolean = n < 0;
  const bitCount: number = Math.ceil(Math.log2(Math.abs(n))) + 1;
  while (more) {
    let byte: number = n & 0x7f;
    n = Math.floor(n / 128);
    if (isNegative) {
      n = n | -(1 << (bitCount - 7));
    }
    if ((n === 0 && (byte & 0x40) === 0) || (n === -1 && (byte & 0x40) !== 0x40)) {
      more = false;
    } else {
      byte |= 0x80;
    }
    buffer.push(byte);
  }
  return buffer;
};
  
/**
 * Encode a number in unsigned LEB128 format.
 * @param {number} n - The number to encode.
 * @returns {number[]} - The encoded number as an array of bytes.
 */
export const unsignedLEB128 = (n: number): number[] => {
  const buffer: number[] = [];
  do {
    let byte: number = n & 0x7f;
    n >>>= 7;
    if (n !== 0) {
      byte |= 0x80;
    }
    buffer.push(byte);
  } while (n !== 0);
  return buffer;
};
