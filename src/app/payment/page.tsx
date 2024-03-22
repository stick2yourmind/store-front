'use client';

import Button from '@/components/ui/Button';
import useCartStore from '@/store/cart.store';
import Link from 'next/link';
import { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

function Payment(request: any) {
  const resetCart = useCartStore((state) => state.resetCart);

  useEffect(() => {
    resetCart();
  }, [resetCart]);

  return (
    <main className="flex grow flex-col items-center justify-center">
      <p className="mb-6 text-4xl">Thanks for your payment!</p>
      <FaCheckCircle className="mb-4 text-[14rem] text-[color:#14b8a6]" />
      <Link href="/">
        <Button className="bg-cyan-950">Home</Button>
      </Link>
    </main>
  );
}
export default Payment;
