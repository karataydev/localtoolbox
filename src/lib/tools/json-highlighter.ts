export function highlightJson(jsonString: string): string {
  if (!jsonString || jsonString.trim() === "") {
    return "";
  }

  try {
    // First, ensure it's valid JSON by parsing
    JSON.parse(jsonString);

    // Use a more careful approach - mark sections to avoid re-processing
    let result = "";
    let i = 0;
    const chars = jsonString.split("");

    while (i < chars.length) {
      const char = chars[i];

      // Handle strings (both keys and values)
      if (char === '"') {
        let stringContent = "";
        i++; // skip opening quote

        // Collect string content
        while (i < chars.length && chars[i] !== '"') {
          if (chars[i] === "\\" && i + 1 < chars.length) {
            stringContent += chars[i] + chars[i + 1];
            i += 2;
          } else {
            stringContent += chars[i];
            i++;
          }
        }

        // Check if this is a key (followed by :) or value
        let isKey = false;
        let j = i + 1;
        while (j < chars.length && /\s/.test(chars[j])) j++;
        if (chars[j] === ":") {
          isKey = true;
        }

        // Add highlighted string
        result += '<span class="text-[#ad8e97]">"</span>';
        if (isKey) {
          result +=
            '<span class="text-[#ad8e97] font-semibold">' +
            stringContent +
            "</span>";
        } else {
          result += '<span class="text-stone-600">' + stringContent + "</span>";
        }
        result += '<span class="text-[#ad8e97]">"</span>';

        i++; // skip closing quote
      }
      // Handle numbers, booleans, null
      else if (/[\d\-tfn]/.test(char)) {
        let value = "";
        while (i < chars.length && /[\w\.\-]/.test(chars[i])) {
          value += chars[i];
          i++;
        }
        result += '<span class="text-stone-600">' + value + "</span>";
      }
      // Handle punctuation
      else if (/[{}[\],:.]/.test(char)) {
        result += '<span class="text-[#ad8e97]">' + char + "</span>";
        i++;
      }
      // Handle whitespace and everything else
      else {
        result += char;
        i++;
      }
    }

    return result;
  } catch {
    // If invalid JSON, return as-is
    return jsonString;
  }
}
