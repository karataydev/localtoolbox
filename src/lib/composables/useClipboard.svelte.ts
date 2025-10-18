import { copyToClipboard } from "$lib/tools/clipboard";
import { useToast } from "$lib/stores/toast.svelte";

export function useClipboard() {
  const toast = useToast();

  async function copyWithToast(
    text: string,
    successMessage: string = "Copied to clipboard!",
    errorMessage: string = "Failed to copy",
    duration: number = 4000
  ): Promise<void> {
    try {
      await copyToClipboard(text);
      toast.showToast(successMessage, duration);
    } catch (err) {
      toast.showToast(errorMessage, duration);
    }
  }

  return {
    copyWithToast,
  };
}
