/**
 * Serializa dados estruturados (JSON-LD) para uso em <script>.
 * Escapa "<" para impedir que um texto feche a tag </script> (injeção de HTML).
 */
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
