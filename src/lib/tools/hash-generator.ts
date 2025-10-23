import CryptoJS from "crypto-js";

export type HashAlgorithm =
  | "MD5"
  | "SHA-1"
  | "SHA-256"
  | "SHA-384"
  | "SHA-512"
  | "SHA-3"
  | "RIPEMD-160";

export function generateHash(text: string, algorithm: HashAlgorithm): string {
  if (!text) return "";

  try {
    switch (algorithm) {
      case "MD5":
        return CryptoJS.MD5(text).toString();
      case "SHA-1":
        return CryptoJS.SHA1(text).toString();
      case "SHA-256":
        return CryptoJS.SHA256(text).toString();
      case "SHA-384":
        return CryptoJS.SHA384(text).toString();
      case "SHA-512":
        return CryptoJS.SHA512(text).toString();
      case "SHA-3":
        return CryptoJS.SHA3(text).toString();
      case "RIPEMD-160":
        return CryptoJS.RIPEMD160(text).toString();
      default:
        return "Unsupported algorithm";
    }
  } catch (error) {
    return `Error: Failed to generate hash\n${error}`;
  }
}
