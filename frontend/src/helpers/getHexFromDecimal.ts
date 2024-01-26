export default function getHexFromDecimal(decimal: number) {
  return decimal.toString(16).padStart(2, '0');
}
