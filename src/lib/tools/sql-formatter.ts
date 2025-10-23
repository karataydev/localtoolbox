import { format } from "sql-formatter";

export default function formatSql(sqlString?: string): string {
  if (!sqlString || sqlString.trim() === "") return "";

  try {
    return format(sqlString, {
      language: "sql",
      tabWidth: 2,
      keywordCase: "upper",
      indentStyle: "standard",
    });
  } catch (error) {
    return `Error: Invalid SQL syntax\n${error}`;
  }
}
