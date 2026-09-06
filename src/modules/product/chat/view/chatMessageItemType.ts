export function chatMessageItemType(body: string): "short" | "long" {
  return body.length < 80 ? "short" : "long";
}
