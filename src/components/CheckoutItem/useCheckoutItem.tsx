export interface IUseCheckoutItemProps {
  price: number;
  quantity: number;
}

function useCheckoutItem({ price, quantity }: IUseCheckoutItemProps) {
  const priceFormatted = price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const subTotal = Math.round(price * quantity * 100) / 100;
  const subTotalFormatted = subTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  return { localePrice: priceFormatted, localeSubtotal: subTotalFormatted };
}
export default useCheckoutItem;
