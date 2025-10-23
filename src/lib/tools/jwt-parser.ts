export interface JwtParsed {
  header: any;
  payload: any;
  signature: string;
}

export function parseJwt(token: string): string {
  if (!token || token.trim() === "") {
    return "";
  }

  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      return "Invalid JWT: Must have 3 parts separated by dots";
    }

    // Decode header
    const header = JSON.parse(atob(parts[0]));

    // Decode payload
    const payload = JSON.parse(atob(parts[1]));

    // Signature stays as base64
    const signature = parts[2];

    const result = {
      header,
      payload,
      signature,
    };

    return JSON.stringify(result, null, 2);
  } catch (err) {
    return "Error: Invalid JWT token";
  }
}
