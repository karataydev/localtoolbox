import * as Diff from "diff";

export type DiffLineType = "added" | "removed" | "unchanged" | "modified";

export interface DiffLine {
  content: string;
  type: DiffLineType;
}

export interface JsonDiffResult {
  leftLines: DiffLine[];
  rightLines: DiffLine[];
  hasDifferences: boolean;
}

export function compareJson(json1: string, json2: string): JsonDiffResult {
  if (!json1 && !json2) {
    return { leftLines: [], rightLines: [], hasDifferences: false };
  }

  try {
    const obj1 = json1.trim() ? JSON.parse(json1) : {};
    const obj2 = json2.trim() ? JSON.parse(json2) : {};

    // Normalize by sorting keys recursively for semantic comparison
    const normalized1 = sortKeysRecursive(obj1);
    const normalized2 = sortKeysRecursive(obj2);

    const formatted1 = JSON.stringify(normalized1, null, 2);
    const formatted2 = JSON.stringify(normalized2, null, 2);

    // Use battle-tested diff library
    const changes = Diff.diffLines(formatted1, formatted2);

    const leftLines: DiffLine[] = [];
    const rightLines: DiffLine[] = [];
    let hasDifferences = false;

    // Collect all changes first
    const pendingRemoved: string[] = [];

    for (const change of changes) {
      const lines = change.value.split("\n");
      // Remove last empty line if exists
      if (lines[lines.length - 1] === "") {
        lines.pop();
      }

      if (change.removed) {
        // Collect removed lines to potentially pair with added lines
        hasDifferences = true;
        pendingRemoved.push(...lines);
      } else if (change.added) {
        // Try to pair with removed lines
        hasDifferences = true;
        const addedLines = lines;

        // Pair up removed and added lines that have same key
        let removedIdx = 0;
        let addedIdx = 0;

        while (removedIdx < pendingRemoved.length || addedIdx < addedLines.length) {
          const removedLine =
            removedIdx < pendingRemoved.length ? pendingRemoved[removedIdx] : null;
          const addedLine = addedIdx < addedLines.length ? addedLines[addedIdx] : null;

          if (
            removedLine !== null &&
            addedLine !== null &&
            haveSameKey(removedLine, addedLine)
          ) {
            // Same key, different value - show on same line as modified
            leftLines.push({ content: removedLine, type: "modified" });
            rightLines.push({ content: addedLine, type: "modified" });
            removedIdx++;
            addedIdx++;
          } else if (removedLine !== null && addedLine === null) {
            // Only removed line left
            leftLines.push({ content: removedLine, type: "removed" });
            rightLines.push({ content: "", type: "removed" });
            removedIdx++;
          } else if (removedLine === null && addedLine !== null) {
            // Only added line left
            leftLines.push({ content: "", type: "added" });
            rightLines.push({ content: addedLine, type: "added" });
            addedIdx++;
          } else {
            // Different keys - show separately
            if (removedLine !== null) {
              leftLines.push({ content: removedLine, type: "removed" });
              rightLines.push({ content: "", type: "removed" });
              removedIdx++;
            }
            if (addedLine !== null) {
              leftLines.push({ content: "", type: "added" });
              rightLines.push({ content: addedLine, type: "added" });
              addedIdx++;
            }
          }
        }

        pendingRemoved.length = 0; // Clear pending
      } else {
        // Flush any pending removed lines first
        for (const line of pendingRemoved) {
          leftLines.push({ content: line, type: "removed" });
          rightLines.push({ content: "", type: "removed" });
        }
        pendingRemoved.length = 0;

        // Unchanged lines
        for (const line of lines) {
          leftLines.push({ content: line, type: "unchanged" });
          rightLines.push({ content: line, type: "unchanged" });
        }
      }
    }

    // Flush any remaining removed lines
    for (const line of pendingRemoved) {
      leftLines.push({ content: line, type: "removed" });
      rightLines.push({ content: "", type: "removed" });
    }

    if (!hasDifferences) {
      const msg = "✓ No differences found - JSON objects are identical";
      return {
        leftLines: [{ content: msg, type: "unchanged" }],
        rightLines: [{ content: msg, type: "unchanged" }],
        hasDifferences: false,
      };
    }

    return {
      leftLines,
      rightLines,
      hasDifferences,
    };
  } catch (error) {
    const errorMsg = `Error: Invalid JSON input\n${error}`;
    return {
      leftLines: [{ content: errorMsg, type: "unchanged" }],
      rightLines: [{ content: errorMsg, type: "unchanged" }],
      hasDifferences: false,
    };
  }
}

function sortKeysRecursive(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => sortKeysRecursive(item));
  }

  const sorted: any = {};
  const keys = Object.keys(obj).sort();

  for (const key of keys) {
    sorted[key] = sortKeysRecursive(obj[key]);
  }

  return sorted;
}

function haveSameKey(line1: string, line2: string): boolean {
  // Extract JSON key from lines like:  "key": value
  const keyRegex = /^\s*"([^"]+)":/;
  const match1 = line1.match(keyRegex);
  const match2 = line2.match(keyRegex);

  if (match1 && match2) {
    return match1[1] === match2[1];
  }

  // If both lines have similar structure (same indentation, both are braces, etc)
  const trimmed1 = line1.trim();
  const trimmed2 = line2.trim();

  // Both are structural characters (braces, brackets)
  if (
    (trimmed1 === "{" && trimmed2 === "{") ||
    (trimmed1 === "}" && trimmed2 === "}") ||
    (trimmed1 === "[" && trimmed2 === "[") ||
    (trimmed1 === "]" && trimmed2 === "]")
  ) {
    return true;
  }

  return false;
}
