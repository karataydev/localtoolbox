import * as yaml from "js-yaml";

export function convertPropertiesToYaml(propertiesString: string): string {
  try {
    const lines = propertiesString.split("\n").filter((line) => line.trim());
    const result: any = {};

    for (const line of lines) {
      if (line.trim().startsWith("#") || !line.includes("=")) continue;

      const [key, ...valueParts] = line.split("=");
      const value = valueParts.join("=").trim();
      const keys = key.trim().split(".");

      let current = result;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        // Handle array notation like key[0]
        const arrayMatch = k.match(/^(.+)\[(\d+)\]$/);
        if (arrayMatch) {
          const arrayKey = arrayMatch[1];
          const index = parseInt(arrayMatch[2]);
          if (!current[arrayKey]) {
            current[arrayKey] = [];
          }
          if (!current[arrayKey][index]) {
            current[arrayKey][index] = {};
          }
          current = current[arrayKey][index];
        } else {
          if (!current[k]) {
            current[k] = {};
          }
          current = current[k];
        }
      }

      const lastKey = keys[keys.length - 1];
      const arrayMatch = lastKey.match(/^(.+)\[(\d+)\]$/);
      if (arrayMatch) {
        const arrayKey = arrayMatch[1];
        const index = parseInt(arrayMatch[2]);
        if (!current[arrayKey]) {
          current[arrayKey] = [];
        }
        current[arrayKey][index] = parseValue(value);
      } else {
        current[lastKey] = parseValue(value);
      }
    }

    return yaml.dump(result, { indent: 2 });
  } catch (error) {
    return `Failed to parse Properties: ${error}`;
  }
}

function parseValue(value: string): any {
  if (value === "") return null;
  if (value === "true") return true;
  if (value === "false") return false;
  if (!isNaN(Number(value)) && value !== "") return Number(value);
  return value;
}

export function convertYamlToSpringProperties(yamlString: string): string {
  const flattenObject = (
    obj: any,
    prefix: string = "",
    result: string[] = [],
  ): string[] => {
    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) continue;

      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (value === null || value === undefined) {
        result.push(`${newKey}=`);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (
            typeof item === "object" &&
            item !== null &&
            !Array.isArray(item)
          ) {
            flattenObject(item, `${newKey}[${index}]`, result);
          } else {
            result.push(`${newKey}[${index}]=${formatValue(item)}`);
          }
        });
      } else if (typeof value === "object" && value !== null) {
        flattenObject(value, newKey, result);
      } else {
        result.push(`${newKey}=${formatValue(value)}`);
      }
    }

    return result;
  };

  const formatValue = (value: any): string => {
    if (typeof value === "string") {
      return value;
    }
    return String(value);
  };

  try {
    // Normalize YAML: add space after colons if missing (except for URLs)
    const normalizedYaml = yamlString.replace(/(:)([^\s\/\n])/g, '$1 $2');

    const parsed = yaml.load(normalizedYaml) as any;
    const properties = flattenObject(parsed);
    return properties.join("\n");
  } catch (error) {
    return `Failed to parse YAML: ${error}`;
  }
}
