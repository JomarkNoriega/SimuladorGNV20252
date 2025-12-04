export function moneda(amount){
  if (amount === null || amount === undefined || isNaN(Number(amount))) return 'S/ -';
  return 'S/ ' + Number(amount).toFixed(2);
}
