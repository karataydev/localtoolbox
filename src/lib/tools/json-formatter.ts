export default function formatJson(unFormattedString?: string) {
  if (!unFormattedString) {
    return "";
  }
  try {
    const parsedJSON = JSON.parse(unFormattedString.trim());
    const formattedJSON = JSON.stringify(parsedJSON, null, 2);

    return formattedJSON;
  } catch {
    return "Invalid JSON input";
  }
}
