export const formatNumber = (number: number) =>
  new Intl.NumberFormat("pt-BR").format(number);
