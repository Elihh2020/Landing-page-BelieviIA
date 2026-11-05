/** Validações e máscara do formulário de diagnóstico. */

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/** Mantém só dígitos e limita a 11 (DDD + 9 dígitos). */
export function onlyPhoneDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, 11);
}

/** Aplica máscara brasileira (00) 00000-0000 (ou (00) 0000-0000 para fixo). */
export function maskPhoneBR(value: string): string {
  const digits = onlyPhoneDigits(value);

  if (digits.length <= 2) return digits.replace(/(\d{0,2})/, "($1");
  if (digits.length <= 6) return digits.replace(/(\d{2})(\d{0,4})/, "($1) $2");
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  }
  return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}

export function isValidPhoneBR(value: string): boolean {
  const digits = onlyPhoneDigits(value);
  return digits.length === 10 || digits.length === 11;
}
