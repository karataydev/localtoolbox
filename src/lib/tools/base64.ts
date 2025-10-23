export function encodeBase64(text: string): string {
  if (!text) {
    return "";
  }
  try {
    return btoa(text);
  } catch (err) {
    return "Error: Invalid input for encoding";
  }
}

export function decodeBase64(base64: string): string {
  if (!base64) {
    return "";
  }
  try {
    return atob(base64);
  } catch (err) {
    return "Error: Invalid Base64 string";
  }
}
