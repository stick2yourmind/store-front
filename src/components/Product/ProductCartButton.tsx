'use client';

import useCartStore from '@/store/cart.store';
import { IconContext } from 'react-icons';
import { TbShoppingBagMinus, TbShoppingBagPlus } from 'react-icons/tb';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { SHOW_VARIANT } from '@/lib/framer-variant';

export interface IProductCartButtonProps extends IProduct {}

function ProductCartButton({ id, name, description, image, price }: IProductCartButtonProps) {
  const cart = useCartStore((state) => state.cart);
  const add = useCartStore((state) => state.addToCart);
  const remove = useCartStore((state) => state.removeFromCart);
  const isInCart = cart.some((product) => product.id === id);

  if (isInCart) {
    return (
      <AnimatePresence>
        <motion.button
          variants={SHOW_VARIANT}
          initial="hidden"
          animate="enter"
          exit="hidden"
          onClick={() => {
            toast.info(`${name} removed from cart`);
            remove(id);
          }}
        >
          <IconContext.Provider value={{ color: 'aliceblue' }}>
            <TbShoppingBagMinus className="absolute right-4 top-4 h-10  w-10 rounded bg-orange-600/30 p-1" />
          </IconContext.Provider>
        </motion.button>
      </AnimatePresence>
    );
  }

  return (
    <motion.button
      variants={SHOW_VARIANT}
      initial="hidden"
      animate="enter"
      onClick={() => {
        toast.success(`${name} added to cart`);
        add({ id, name, description, image, price });
      }}
    >
      <IconContext.Provider value={{ color: 'aliceblue' }}>
        <TbShoppingBagPlus className="absolute right-4 top-4 h-10 w-10  rounded bg-[color:#14b8a6] p-1 opacity-60" />
      </IconContext.Provider>
    </motion.button>
  );
}
export default ProductCartButton;
