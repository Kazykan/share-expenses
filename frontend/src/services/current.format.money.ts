function currencyFormatMoney(num: number | undefined): string {
  if (num === undefined) return ''
  return  num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + " ₽"
}
//  console.log(currencyFormatMoney(2665)); // 2,665.00 $
export default currencyFormatMoney