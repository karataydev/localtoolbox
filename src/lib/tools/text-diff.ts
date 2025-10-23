import * as Diff from "diff";

export type TextChangeType = "added" | "removed" | "unchanged";

export interface TextChange {
  value: string;
  type: TextChangeType;
}

export interface TextDiffResult {
  leftChanges: TextChange[];
  rightChanges: TextChange[];
  hasDifferences: boolean;
}

export function compareText(text1: string, text2: string): TextDiffResult {
  if (!text1 && !text2) {
    return { leftChanges: [], rightChanges: [], hasDifferences: false };
  }

  // Use word-level diff for partial line highlighting
  const changes = Diff.diffWords(text1, text2);

  const leftChanges: TextChange[] = [];
  const rightChanges: TextChange[] = [];
  let hasDifferences = false;

  for (const change of changes) {
    if (change.added) {
      // Text added in text2
      hasDifferences = true;
      rightChanges.push({ value: change.value, type: "added" });
    } else if (change.removed) {
      // Text removed from text1
      hasDifferences = true;
      leftChanges.push({ value: change.value, type: "removed" });
    } else {
      // Unchanged text - show on both sides
      leftChanges.push({ value: change.value, type: "unchanged" });
      rightChanges.push({ value: change.value, type: "unchanged" });
    }
  }

  if (!hasDifferences) {
    return {
      leftChanges: [
        { value: "✓ No differences found - texts are identical", type: "unchanged" },
      ],
      rightChanges: [
        { value: "✓ No differences found - texts are identical", type: "unchanged" },
      ],
      hasDifferences: false,
    };
  }

  return {
    leftChanges,
    rightChanges,
    hasDifferences,
  };
}
