/**
 * Escapes regex special characters to prevent ReDoS (Catastrophic Backtracking)
 * and unhandled SyntaxErrors from malicious user query strings.
 */
export function escapeRegex(text) {
  if (!text || typeof text !== "string") return "";
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
