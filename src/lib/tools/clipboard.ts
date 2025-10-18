export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy:", err);
    throw err;
  }
}

export interface CopyResult {
  success: boolean;
  error?: unknown;
}

export async function copyWithResult(text: string): Promise<CopyResult> {
  try {
    await copyToClipboard(text);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
