export function parseCurrency(value: string): number {
  const normalized = value
    .trim()
    .replace(/R\$\s?/gi, '')
    .replace(/\s/g, '')
    .replace(/\.(?=\d{3}(?:\D|$))/g, '')
    .replace(',', '.');
  return normalized ? Number(normalized) : 0;
}

export function formatCurrencyInput(value: number): string {
  return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}

export const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
