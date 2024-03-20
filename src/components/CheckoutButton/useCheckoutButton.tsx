'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import useCartStore from '@/store/cart.store';
import useUserStore from '@/store/user.store';
import { checkoutOrder } from '@/components/CheckoutButton/checkoutOrder.service';

function useCheckoutButton() {
  const { push } = useRouter();

  const cart = useCartStore((state) => state.cart);
  const { isLogged } = useUserStore((state) => state.user);
  const { mutate } = useMutation({
    mutationFn: checkoutOrder,
    onSuccess: (data) => {
      toast.success('Checkout created succesfully');
      window.location.href = data.orderUrl;
    },
    onError: (error) => {
      if (error instanceof Error) {
        if (error.message === 'Unauthorized') {
          toast.warning('Need to sign in first');
          push('/signin');
          return;
        }
      }

      if (error instanceof TypeError) {
        if (error.message === 'NetworkError when attempting to fetch resource.') {
          return toast.error('Server is not reachable');
        }
      }
      return toast.error('An error has ocurred');
    },
  });

  const onCheckout = async () => {
    if (!isLogged) {
      toast.warning('Need to sign in first');
      push('/signin');
      return;
    }
    mutate(cart);
  };

  return { onCheckout };
}

export default useCheckoutButton;
