'use client';

import useCheckoutButton from '@/components/CheckoutButton/useCheckoutButton';
import Button from '@/components/ui/Button';

function CheckoutButton() {
  const { onCheckout } = useCheckoutButton();

  return (
    <Button
      onClick={onCheckout}
      className="max-w-64 self-end bg-[color:#14b8a6] transition-transform hover:scale-110"
    >
      Checkout
    </Button>
  );
}
export default CheckoutButton;
