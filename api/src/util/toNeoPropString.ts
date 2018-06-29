export function toPropString<T extends object>(obj: T): string {
  let props = [] as string[];

  for (let entry of Object.entries(obj)) {
    let key = entry[0];
    let value!: string;

    switch (typeof entry[1]) {
      case "string":
        value = `"${entry[1]}"`;
        break;
      case "number":
      case "boolean":
        value = `${entry[1]}`;
        break;
      default:
        throw new Error("properties must be string, number or boolean");
    }

    props.push(`${key}: ${value}`);
  }

  return "{" + props.join(", ") + "}";
}
