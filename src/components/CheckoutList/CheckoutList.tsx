'use client';

import { AnimatePresence } from 'framer-motion';
import { brunoAceSc, inter } from '@/lib/fonts';
import CheckoutItem from '@/components/CheckoutItem/CheckoutItem';
import useCartStore from '@/store/cart.store';

function CheckoutList() {
  const cart = useCartStore((state) => state.cart);

  const total = cart.reduce((acc, curr) => {
    const subtotal = Math.round(curr.price * curr.quantity * 100) / 100;
    return Math.round((subtotal + acc) * 100) / 100;
  }, 0);

  return (
    <div className={`${inter.className} flex flex-col`}>
      <section className="flex flex-col divide-y-4 divide-y-reverse">
        <h2 className="text-2xl">Checkout list</h2>
        <AnimatePresence>
          {cart.length < 1
            ? 'Your cart is still empty :('
            : cart.map(({ description, id, image, name, price, quantity }) => (
                <CheckoutItem
                  key={id}
                  description={description}
                  id={id}
                  image={image}
                  name={name}
                  price={price}
                  quantity={quantity}
                />
              ))}
        </AnimatePresence>
      </section>
      <div className={`${brunoAceSc.className} flex gap-4 self-end py-4 text-3xl`}>
        <span>Total:</span>
        <span>{total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
      </div>
    </div>
  );
}
export default CheckoutList;
